import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

import Home from "../pages/Home";

export default function Root(){

  const {userState} = useContext(UserContext);  


  if(userState.loggedIn===true){
    return <Home />;
  } else {
    return <Navigate to="/login"/>;
  }

}