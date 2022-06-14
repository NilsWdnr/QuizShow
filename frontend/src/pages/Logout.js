import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

export default function Logout(){

  const {setUser} = useContext(UserContext);

  useEffect(()=>{

    setUser({
      loggedIn: false,
      id: null,
      username: null,
    })

    localStorage.clear();

  },[setUser])  

  return <Navigate replace to="/login"/>;
}