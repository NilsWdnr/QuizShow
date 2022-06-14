import React from "react";
import { Link } from "react-router-dom";

export default function Home (){

    return(
        <main>
            <div className="container-md my-5">
                <div className="row py-sm-5 justify-content-center justify-content-sm-around">
                    <Link to="/ingame" className="btn col-10 col-sm-5 btn-primary-color p-3 mb-3">Einzelspieler Modus</Link> 
                    <button className="btn col-10 col-sm-5 btn-multiplayer p-3 mb-3">
                        <div id="comingSoonMessage">coming soon</div>
                        Mehrspieler Modus
                    </button>
                </div>
                <h3 className="py-3 text-center">Herausforderungen</h3>
                <div className="row mb-5">
                    <p className="text-center">
                        Sobald der Mehrspieler-Modus verfügbar ist stehen, hier deine Herausforderungen
                    </p>
                </div>
            </div>
        </main>
    )
}