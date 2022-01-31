import {useEffect, useContext, useState } from "react";
import { useLocation } from 'react-router-dom';

import { UserContext } from "./context/UserProvider";

export default function Page (props){

    const [cookiesProcessed, setCookiesProcessed] = useState(false)

    const {userState,setUser} = useContext(UserContext);

    const pathname = useLocation().pathname;
    let page = pathname.substring(1);

    if(page===""){
        page = "home";
    }


    //Falls bereits User Daten in der Session gespeichert sind werte im UserContext speicher

    useEffect(() => {     

        if(localStorage.getItem("loggedIn")==="true"){

            const userData = {
                loggedIn: true,
                id: localStorage.getItem("id"),
                username: localStorage.getItem("username"),
                isLoading: false
            }
    
            setUser(userData);

        } else {

            const userData = {
                loggedIn: false,
                id: null,
                username: null,
                isLoading: false
            }
    
            setUser(userData);
        }

       

    }, [])

    return <div className={`${page}-page`}>{props.children}</div>;


}    