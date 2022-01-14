import React from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {

    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <Logo />
                </div>
            </div>
            <div className="test"></div>
            <Navigation />
        </header>
    )
}