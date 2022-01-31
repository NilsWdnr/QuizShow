import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LevelBar from "../components/LevelBar";

import { UserContext } from "../context/UserProvider";

export default function ProfileSelf(){

    const { userState } = useContext(UserContext);

    return(
        <div className="container-md mt-5 px-3 px-md-5">
            <h2>Dein Profil</h2>
            <div className="container-style-primary p-4 mt-3 mb-2">
                <div className="d-flex">
                    <div id="profileImage" className="square"></div>
                    <div className="ps-3">
                        <h3 id="profileName">{userState.username}</h3>
                        <h5>Level</h5>
                        <LevelBar />
                    </div>
                </div>
            </div>
            <Link id="logoutButton" to="/logout"><i className="fas fa-sign-out-alt"></i> Abmelden</Link>
        </div>
    )
}