import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

import getService from "../services/getService";
import postService from "../services/postService";

import User from "../mapping/User";

import LevelBar from "../components/LevelBar";

import { UserContext } from "../context/UserProvider";
import ProfileContext from "../context/ProfileContext";

export default function UserProfile(props){

    const { username } = useParams();
    const { userState } = useContext(UserContext);
    
    const [user, setUser] = useState({});
    const [type, setType] = useState(null);
    const [redirection, setRedirection] = useState(false);
    const [value, setValue] = useState({});

    

    useEffect(()=>{

        const getUser = async () => {
            let resp = await getService("user","getUser",username);
            resp = new User(resp);
            setUser(resp);
        }

        getUser();  
    },[username]);


    useEffect(() => {
        
        const checkIfFriends = async () => {

            const data = {
                userID: userState.id,
                friendID: user.id
            }

            const response = await postService("user","checkIfFriends",data);

            return response;
        }

        
        const getProfileType = async () => {

            if(username===userState.username){
                setType("self");
                return;
            } else if(await checkIfFriends() === true){
                setType("friend");
                return;
            } else {
                setType("unfriended");
            }
        }


      if(user!==null){
        setValue({
            ep: user.ep
        })

        getProfileType()
      }
    }, [user,userState,username])


    const removeFriend = async () => {
        
        const data = {
            userID: userState.id,
            friendID: user.id
        }

        await postService("user","removeFriend",data);

        setRedirection(true);
    }

    const ProfileLowerSection = () => {

        if(type==="self"){
            return  <Link id="logoutButton" to="/logout"><i className="fas fa-sign-out-alt"></i> Abmelden</Link>;
        } else if(type==="friend"){
            return <button onClick={removeFriend} type="button" className="btn btn-danger">Freund entfernen</button>;
        } else {
            return <></>
        }
    }


    const redirectBack = () => {
        window.history.go(-1);
    }

    if(redirection){
        return <Navigate replace to="/friends"/>;
    } else {

        return(
            <ProfileContext.Provider value={value}>
                <div className="container-md mt-5 px-3 px-md-5">
                    <p className="backButton" onClick={redirectBack}><i className="fa-solid fa-circle-arrow-left"></i> zurück</p>
                    <div className="container-style-primary p-4 mt-3 mb-2">
                        <div className="d-flex">
                            <img id="profileImage" className="square" src={user.picture} alt="Avatar"></img>
                            <div className="ps-3">
                                <h3 id="profileName">{username}</h3>
                                <h5>Level</h5>
                                <LevelBar/>
                            </div>
                        </div>
                        <h4 id="profileHighscore" className="mt-4">Highscore: <span>{user.highscore}</span></h4>
                    </div>
                    <ProfileLowerSection />
                </div>
            </ProfileContext.Provider>
        )

    }
}
