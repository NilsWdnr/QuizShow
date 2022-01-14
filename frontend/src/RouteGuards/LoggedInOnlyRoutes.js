import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../context/UserProvider";


export default function LoggedInOnlyRoutes(){

  const {userState} = useContext(UserContext);  

  if(userState.loggedIn===true){
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }

}
