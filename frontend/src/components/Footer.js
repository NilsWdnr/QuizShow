import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Level from "./Level";

import { UserContext } from "../context/UserProvider";


export default function Footer(){

    const {userState} = useContext(UserContext);

    return (
        <footer>
            <Link to="/profileSelf">
                <div className="footer-main">
                    <div className="d-flex">
                        <div className="player-img">
                        </div>
                        <div className="player-info">
                            <p className="player-name">{userState.username}</p>
                            <p className="">Dein Profil ansehen >></p>
                    </div>
                    </div>
                    <div className="d-flex align-items-center">Level <span className="ms-2 player-level"><Level /></span></div>
                </div>
            </Link>    
        </footer>
    );
}