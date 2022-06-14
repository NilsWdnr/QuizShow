import React from "react";
import { Link } from "react-router-dom";

export default function Friend({user}){
  return(
    <Link to={`/user/${user.username}`}>
        <div className="friend-row row justify-content-center pb-3">
            <div className="friend col-10 col-sm-7 col-lg-5 py-2 px-4">
                <div className="row justify-content-between">
                    <div className="col-10">
                        <div className="row align-items-center">
                            <div className="col-2 p-0">
                                <img className="square player-img" src={user.picture} alt="Avatar"></img>
                            </div>
                            <div className="col-10">
                                <p className="m-0 playerNotice-name">{user.username}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 playerNotice-arrow"></div>
                </div>
            </div>
        </div>
    </Link>
  );
}