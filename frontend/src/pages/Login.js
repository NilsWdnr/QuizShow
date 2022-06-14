import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import postService from "../services/postService";
import User from "../mapping/User";

import { UserContext } from "../context/UserProvider";


export default function Login (){

    const {userState, setUser} = useContext(UserContext);

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [usernameMessage, setUsernameMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [loginMessage, setLoginMessage] = useState(null);

    const handleChange = (e) => {
        const inputField = e.target.id;
        const input = e.target.value;
        if(inputField==="username"){
            setUsername(input);
        } else {
            setPassword(input);
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
        }

        login(loginData);
    }

    const login = async (data) => {

        const response = await postService("user","login",data);

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
            setPasswordMessage(response["password"] ? response["password"] : null);
            setLoginMessage(response["login"] ? response["login"] : null);            
        }



    }

    const ErrorMessage = ({field}) => {

        let message;

        switch(field){
            case "username":
                message = usernameMessage;
                break;   
            case "password":
                message = passwordMessage;
                break;  
            case "login":
                message = loginMessage;
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
        return <Navigate replace to="/"/>;
    } else {

        return(
            <div className="container-fluid pt-5 px-3 register-wrapper">
                <div className="row justify-content-center">
                    <div className="py-3 px-3 px-sm-5 my-5 col-10 col-lg-6 container-style-primary">
                        <h2>Wilkommen</h2>
                        <h3>Um mit dem Spielen loszulegen musst du dich zunächst anmelden</h3>
                        <form className="my-4" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Benutzername</label>
                                <input type="text" className="form-control mb-3" id="username" placeholder="Benutzername" value={username} onChange={handleChange} />
                                <ErrorMessage field="username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Passwort</label>
                                <input type="password" className="form-control mb-3" id="password" placeholder="Password" value={password} onChange={handleChange}/>
                                <ErrorMessage field="password"/>
                            </div>
                            <ErrorMessage field="login"/>
                            <button type="submit" className="btn btn-primary">Anmelden</button>
                        </form>
                        <Link to="/register">Noch kein Konto? Jetzt registrieren</Link>
                    </div>
                </div>
            </div>
        )

    }

    
}