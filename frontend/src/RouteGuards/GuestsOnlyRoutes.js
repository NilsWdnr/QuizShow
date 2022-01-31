import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

export default function GuestsOnlyRoutes(){

  const user = useContext(UserContext);

  if(UserContext.loggedIn==="true"){
    return <Navigate to="/" />;
  } else {
    return <Outlet />
  }

}

