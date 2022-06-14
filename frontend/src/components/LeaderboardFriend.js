import React from "react";
import { Link } from "react-router-dom";

export default function LeaderboardFriend({user,rank,self}){
  return(
    <div className="friend-row row justify-content-center pb-3">
        <div className='rank col-1 d-flex justify-content-center align-items-center'>{rank}.</div>   
        <Link to={`/user/${user.username}`} className={"friend col-10 col-sm-7 col-lg-4 py-2 px-4 " + (self ? "self" : "")}>
            <div className="row justify-content-between">
                <div className="col-9">
                    <div className="row">
                        <div className="col-2 p-0">
                            <img className="player-img square" src={user.picture} alt="Avatar"></img>
                        </div>
                        <div className="col-10">
                            <p className="m-0 playerNotice-name">{user.username}</p>
                            <p className="m-0 playerNotice-time">{user.highscore}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  );
}