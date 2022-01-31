import React, { useEffect ,useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

export default function Home (){


    const {userState} = useContext(UserContext)
    const username = userState.username;


    return(
        <main>
            <div className="container-md my-5">
                <div className="row py-sm-5 justify-content-center justify-content-sm-around">
                    <button className="btn col-10 col-sm-5 btn-primary-color p-3 mb-3"><Link to="/ingame">Einzelspieler Modus</Link></button>
                    <button className="btn col-10 col-sm-5 btn-multiplayer p-3 mb-3">Mehrspieler Modus</button>
                </div>
                <h3 className="py-3 text-center">Herausforderungen</h3>
                <div className="row justify-content-center">
                    <div className="challenge col-8 col-sm-6 col-lg-4 py-2 px-4">
                        <div className="row justify-content-between">
                            <div className="col-10">
                                <div className="row">
                                    <div className="col-2">
                                        <div className="playerNotice-img"></div>
                                    </div>
                                    <div className="col-10">
                                        <p className="m-0 playerNotice-name">Player123456</p>
                                        <p className="m-0 playerNotice-time">vor 6 Stunden</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 playerNotice-arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}