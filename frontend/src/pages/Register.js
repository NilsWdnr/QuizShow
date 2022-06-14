import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import postService from "../services/postService";
import User from "../mapping/User";

import { UserContext } from "../context/UserProvider";

export default function Register (){

    const {userState, setUser} = useContext(UserContext); 

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");    
    const [password,setPassword] = useState("");
    const [passwordRepeat,setPasswordRepeat] = useState("");

    const [usernameMessage, setUsernameMessage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [passwordRepeatMessage, setPasswordRepeatMessage] = useState(null);

    const handleChange = (e) => {
        const inputField = e.target.id;
        const input = e.target.value;

        switch(inputField){
            case "username":
                setUsername(input);
                break;   
            case "email":
                setEmail(input);
                break; 
            case "password":
                setPassword(input);
                break;    
            case "passwordRepeat":
                setPasswordRepeat(input);
                break;
            default:
                break;                                         
          }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const registerData = {
            username: username,
            email: email,
            password: password,
            password_repeat: passwordRepeat
        };

        register(registerData);

    }

    const register = async (data) => {

        const response = await postService("user","register",data);

        if(response["success"]===true){

            const user = new User(response.user);
            
            const userData = {
                loggedIn: true,
                isLoading: false,
                ...user
              };

            localStorage.setItem("token",response.token);
        
            setUser(userData);

        } else {
            setUsernameMessage(response["username"] ? response["username"] : null);
            setEmailMessage(response["email"] ? response["email"] : null);
            setPasswordMessage(response["password"] ? response["password"] : null);
            setPasswordRepeatMessage(response["password_repeat"] ? response["password_repeat"] : null);
        }

    }

    const ErrorMessage = ({field}) => {

        let message;

        switch(field){
            case "username":
                message = usernameMessage;
                break;   
            case "email":
                message = emailMessage;
                break;    
            case "password":
                message = passwordMessage;
                break;  
            case "passwordRepeat":
                message = passwordRepeatMessage;
                break;
            default:
                message = null;
                break;                                            
        }

        if(message!==null){
            return (<div className="alert alert-danger py-2" role="alert">
                       {message}
                    </div>);
        } else {
            return <></>;
        }
    }

    if(userState.loggedIn===true){
        return <Navigate replace to="/" />;
    } else {

        return(
            <div className="container-fluid pt-5 px-3 register-wrapper">
                <div className="row justify-content-center">
                    <div className="py-3 px-3 px-sm-5 my-5 col-11 col-lg-6 container-style-primary">
                        <h2>Wilkommen</h2>
                        <h3>Erstelle dir zunächst ein Konto, um mit dem Spielen anzufangen</h3>
                        <form className="my-4" onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="username">Benutzername</label>
                                <input type="text" className="form-control mb-3" id="username" value={username} onChange={handleChange} />
                                <ErrorMessage field="username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email-Adresse</label>
                                <input type="email" className="form-control mb-3" id="email" value={email} onChange={handleChange} />
                                <ErrorMessage field="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Passwort</label>
                                <input type="password" className="form-control mb-3" id="password" value={password} onChange={handleChange}/>
                                <ErrorMessage field="password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password-repeat">Passwort wiederholen</label>
                                <input type="password" className="form-control mb-3" id="passwordRepeat" value={passwordRepeat} onChange={handleChange}/>
                                <ErrorMessage field="passwordRepeat"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Registrieren</button>
                        </form>
                        <Link to="/login">Du hast bereits ein Konto? Jetzt anmelden</Link>
                    </div>
                </div>
            </div>
        )

    }    
}