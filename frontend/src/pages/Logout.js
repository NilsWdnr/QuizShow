import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

export default function Logout(){

  const {setUser} = useContext(UserContext);

  setUser({
    loggedIn: false
  })
  
  localStorage.clear();


  return <Navigate replace to="/login"/>;
}