import React from "react";
import { Navigate } from "react-router-dom";

export default function Restart(){
  return <Navigate replace to="/ingame"/>;
}