import { isEmpty } from "lodash";
import { createContext, useContext, useEffect, useState } from "react";

import Friend from "../components/Friend";
import AddFriend from "../components/AddFriend";

import User from "../mapping/User";
import getService from "../services/getService";

import { UserContext } from "../context/UserProvider";

const AddFriendContext = createContext();

export default function Friends(){

    const { userState } = useContext(UserContext);

    const [display, setDisplay] = useState("none");
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriends();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const getFriends = () => {
        const userID = userState.id;

        getService("user","getFriends",userID)
            .then(res => res.map(e => new User(e)))
            .then(res => setFriends(res))

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

    const FriendsList = () => {
        
        if(isEmpty(friends)){
            return(
                <p className="text-center py-4">
                Sieht als als hättest du noch keine Freunde...
                </p>
            );
        } else {

            return(
                <>
                    {friends.map((e)=>{
                        return <Friend key={e.id} user={e} />
                    })}
                </>
            )

        }
        
    }

    return(
        <main>
            <AddFriendContext.Provider value={value}>
                <AddFriend/>
                <div className="container-md my-5">
                    <h2 className="text-center pb-3">Meine Freunde</h2>
                    <div className="friends-container">
                        <FriendsList />
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