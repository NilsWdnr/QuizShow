import {useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';

import User from "./mapping/User"; 

import postService from "./services/postService";

import { UserContext } from "./context/UserProvider";

export default function Page (props){

    const {setUser} = useContext(UserContext);

    const pathname = useLocation().pathname;
    let page = pathname.substring(1);

    if(page===""){
        page = "home";
    }

    //User einloggen, falls im Local Storage bereits Nutzer Daten gespeichert sind

    useEffect(() => {       

        const logIn = async () => {

            const data = {
                token: localStorage.getItem("token"),
            }
    
            const response = await postService("user","tokenLogin",data);
    
            if(response.success===true){
    
                const user = new User(response.user);
                
                const userData = {
                    loggedIn: true,
                    isLoading: false,
                    ...user
                }
        
                setUser(userData);
    
            } else {
    
                loginFailed();
    
            }
    
        }
    
        const loginFailed = () => {
    
            const userData = {
                loggedIn: false,
                id: null,
                username: null,
                isLoading: false
            }
    
            setUser(userData);
    
        }

        if(localStorage.getItem("token")!==null){
            logIn();
        } else {
            loginFailed();
        }

    
    }, [setUser]);

    return <div className={`${page}-page`}>{props.children}</div>;


}    