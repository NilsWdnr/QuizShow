import { Link } from "react-router-dom";

export default function Navigation(){
        return (
            <div className="container-fluid">
                <div className="row">      
                    <nav className="pt-2 col-12">
                        <div className="row">
                                <Link className="pb-1 pb-lg-1 col-3 nav-link-home" to="/">
                                    <div className="nav-icon nav-icon-home"></div><span className="d-none d-lg-inline">Home</span>
                                </Link>
                                <Link className="pb-1 pb-lg-1 col-3 nav-link-friends" to="/friends">
                                    <div className="nav-icon nav-icon-friends"></div><span className="d-none d-lg-inline">Freunde</span>
                                </Link>
                                <Link className="pb-1 pb-lg-1 col-3 nav-link-leaderboard" to="/leaderboard">
                                    <div className="nav-icon nav-icon-leaderboard"></div><span className="d-none d-lg-inline">Bestenliste</span>
                                </Link>
                                <Link className="pb-1 pb-lg-1 col-3 nav-link-settings" to="/settings">
                                    <div className="nav-icon nav-icon-settings"></div><span className="d-none d-lg-inline">Einstellungen</span>
                                </Link>
                        </div>
                    </nav>
                </div>
            </div>
        );  
}