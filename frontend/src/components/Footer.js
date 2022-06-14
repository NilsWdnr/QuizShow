import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Level from "./Level";

import { UserContext } from "../context/UserProvider";
import ProfileContext from "../context/ProfileContext";


export default function Footer(){

    const {userState} = useContext(UserContext);
    const value = {
        id: userState.id
    };

    return (
        <ProfileContext.Provider value={value}>
            <footer>
                <Link to={`/user/${userState.username}`}>
                    <div className="footer-main">
                        <div className="d-flex">
                            <img className="player-img square" src={userState.picture} alt="Your own avatar"></img>
                            <div className="player-info">
                                <p className="player-name">{userState.username}</p>
                                <p className="">Dein Profil ansehen >></p>
                        </div>
                        </div>
                        <div className="d-flex align-items-center">Level <span className="ms-2 player-level"><Level /></span></div>
                    </div>
                </Link>    
            </footer>
        </ProfileContext.Provider>
    );
}