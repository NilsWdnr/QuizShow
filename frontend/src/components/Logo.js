import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../assets/img/logo.png";

export default function logo (){
    return (
            <Link className="p-0 col-7 col-sm-5 col-md-3" to="/">
                <img id="logo-quizshow" className=" p-2" src={logoImg} alt="QuizShow" />
            </Link>
            )
}