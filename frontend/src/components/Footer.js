import { Link } from "react-router-dom";

export default function Footer(){

    return (
        <footer>
            <Link to="/profileSelf">
                <div className="footer-main">
                    <div className="d-flex">
                        <div className="player-img">
                        </div>
                        <div className="player-info">
                            <p className="player-name">Testfred</p>
                            <p className="">Dein Profil ansehen >></p>
                    </div>
                    </div>
                    <div className="d-flex align-items-center">Level <span className="ms-2 player-level">12</span></div>
                </div>
            </Link>    
        </footer>
    );
}