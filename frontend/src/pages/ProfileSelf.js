import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

export default function ProfileSelf(){

    const { REACT_APP_BACKEND_URL } = process.env;

    const { userState } = useContext(UserContext);

    const [playerLevel, setPlayerLevel] = useState(0);
    const [levelBarWidth, setLevelBarWidth] = useState("0%");
    const [epCount, setEpCount] = useState(0);

    useEffect(() => {
        const userID = userState.id;

        fetch(`${REACT_APP_BACKEND_URL}/user/getExperiencepoints/${userID}`)
            .then(res=>res.json())
            .then(json=>calculateLevel(json))
    }, [])

    function calculateLevel(ep){
        ep = parseInt(ep);
        const level = Math.ceil((ep+1)/10000);
        setPlayerLevel(level);

        calculateLevelBar(ep,level);
        
    }

    function calculateLevelBar(ep,level){
        const reference = 10000 * (level-1);
        ep = ep - reference;
        let progress = ep/100;
        setLevelBarWidth(progress+"%");

        setEpCount(ep);
    }

    return(
        <div className="container-md mt-5 px-3 px-md-5">
            <h2>Dein Profil</h2>
            <div className="container-style-primary p-4 mt-3 mb-2">
                <div className="d-flex">
                    <div id="profileImage" className="square"></div>
                    <div className="ps-3">
                        <h3 id="profileName">Testfred</h3>
                        <h5>Level</h5>
                        <div className="ms-2 player-level">
                            {playerLevel}
                            <div id="levelBar">
                                <div id="levelBarInner" style={{width: levelBarWidth}}>  </div>
                            </div>
                            <div id="levelBarOverlay" className="d-flex justify-content-center align-items-center">
                                    {epCount}/10000 EP
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link id="logoutButton" to="/logout"><i className="fas fa-sign-out-alt"></i> Abmelden</Link>
        </div>
    )
}