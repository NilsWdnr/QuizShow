import Logo from "./Logo";

export default function HeaderInGame(){
    return(
        <header id="header-ingame">
            <div className="container-fluid">
                <div className="row justify-content-between">
                    <Logo />
                    <div id="score-container"className="col-12 pt-2 col-sm-auto">
                        <p className="m-0">Highscore: <span className="" id="personal-highscore">3500</span></p>
                        <p>Score: <span id="score">1000</span></p>
                    </div>
                </div>
            </div>
        </header>
    )
}
