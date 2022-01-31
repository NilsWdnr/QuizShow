import { createContext, useContext, useEffect, useState } from "react";
import AddFriend from "../components/AddFriend";

import { UserContext } from "../context/UserProvider";

const AddFriendContext = createContext();

export default function Friends(){

    const { userState } = useContext(UserContext);

    const [display, setDisplay] = useState("none");
    const [friends, setFriends] = useState([]);

    const { REACT_APP_BACKEND_URL } = process.env;

    useEffect(() => {
        getFriends();
    }, [])

    const getFriends = () => {
        const userID = userState.id;

        fetch(`${REACT_APP_BACKEND_URL}/user/getFriends/${userID}`)
        .then(data=>data.json())
        .then(json=>setFriends(json));
    }
        
    const handleClick = () => {
        if(display==="none"){
            setDisplay("flex");
        } else {
            setDisplay("none");
        }
    }

    const value={

        displayState: display,
        setDisplay,
        getFriends

    }

    const Friend = ({username}) => {
        return(
            <div className="friend-row row justify-content-center pb-3">
                <div className="friend col-10 col-sm-7 col-lg-5 py-2 px-4">
                    <div className="row justify-content-between">
                        <div className="col-10">
                            <div className="row">
                                <div className="col-2">
                                    <div className="playerNotice-Img"></div>
                                </div>
                                <div className="col-10">
                                    <p className="m-0 playerNotice-name">{username}</p>
                                    <p className="m-0 playerNotice-time">vor 6 Stunden</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 playerNotice-arrow"></div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <main>
            <AddFriendContext.Provider value={value}>
                <AddFriend friends={friends}/>
                <div className="container-md my-5">
                    <h2 className="text-center pb-3">Meine Freunde</h2>
                    <div className="friends-container">
                        {friends.map((e)=>{
                            return <Friend key={e.id} username={e.username} />
                        })}
                    </div>

                    <div className="mt-3 row justify-content-center">
                        <button onClick={handleClick} className="btn col-10 col-sm-6 col-lg-4 btn-primary-color p-3"><i className="fas fa-plus"></i> Freunde hinzufügen</button>
                    </div>    
                </div>
            </AddFriendContext.Provider>
        </main>
    )
}

export { AddFriendContext };