import React, {useState, useEffect, useContext } from "react";

import { UserContext } from "../context/UserProvider";

export default function Leaderboard(){

    const { REACT_APP_BACKEND_URL } = process.env;

    const {userState} = useContext(UserContext);

    const [highscore, setHighscore] = useState(0);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getHighscore();
        getFriends();
    }, [])

    const getHighscore = () => {

        const userID = userState.id;

        fetch(`${REACT_APP_BACKEND_URL}/user/getHighscore/${userID}`)
        .then(data=>data.json())
        .then(json=>setHighscore(json));

    }

    const getFriends = () => {
        const userID = userState.id;

        fetch(`${REACT_APP_BACKEND_URL}/user/getFriends/${userID}`)
        .then(data=>data.json())
        .then(json=>setFriends(json));
    }

    const Friend = ({user}) => {
       return(
        <div className="friend-row row justify-content-center pb-3">
            <div className='rank col-1 d-flex justify-content-center align-items-center'>1.</div>   
            <div className="friend col-10 col-sm-7 col-lg-4 py-2 px-4">
                <div className="row justify-content-between">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-2 p-0">
                                <div className="playerNotice-Img square"></div>
                            </div>
                            <div className="col-10">
                                <p className="m-0 playerNotice-name">{user.username}</p>
                                <p className="m-0 playerNotice-time">{user.highscore}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       )
    }

    return(
        <main>
            <div className='container mt-5' id="leaderboard">
                <h2 className='text-center pt-5'>Persönlicher Highscore</h2>
                <p className='personal-highscore text-center'>{highscore}</p>

                <h2 className='text-center pt-5 pb-3'>Deine Freunde</h2>
                <div className="friends-leaderboard">
                    {friends.map((e)=>{
                        return <Friend key={e.id} user={e} />
                    })}
                </div>
            </div>
        </main>
    )
} 