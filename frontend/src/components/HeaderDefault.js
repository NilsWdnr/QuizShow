import Logo from "./Logo";

export default function HeaderDefault (){

    return(
        <header>
            <div className="container-fluid">
                <div className="row">
                    <Logo />
                </div>
            </div>        
        </header>
    )
}