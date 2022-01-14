import {useEffect, useContext, useState } from "react";
import { useLocation } from 'react-router-dom';

import { UserContext } from "./context/UserProvider";

export default function Page (props){

    const [cookiesProcessed, setCookiesProcessed] = useState(false)

    const {userState,setUser} = useContext(UserContext);

    const pathname = useLocation().pathname;
    const page = pathname.substring(1);


    //Falls bereits User Daten in der Session gespeichert sind werte im UserContext speicher

    useEffect(() => {     

        console.log(localStorage.getItem("loggedIn"));

        if(localStorage.getItem("loggedIn")==="true"){

            const userData = {
                loggedIn: true,
                id: 3,
                username: "Nils",
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

    return <div className={page}>{props.children}</div>;


}    