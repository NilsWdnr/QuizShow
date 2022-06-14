import { isEmpty } from "lodash";

import { useState, useContext } from "react";
import { AddFriendContext } from "../pages/Friends";

import { UserContext } from "../context/UserProvider";

import postService from "../services/postService";
import getService from "../services/getService";

import User from "../mapping/User";



export default function AddFriend(props){

  const { userState } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [foundUser,setFoundUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("")
  const [messageColor, setMessageColor] = useState("");

  const {displayState,setDisplay,getFriends} = useContext(AddFriendContext);

  const handleChange = (e) => {
    const input = e.target.value;
    setUsername(input);
  }

  const close = () => {
    setSubmitted(false);
    setMessage("");
    setUsername("");
    setFoundUser([]);
    setDisplay("none");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    setMessage("");
    searchUser();
  }

  const searchUser = async () => {

    let result = await getService("user","search",username);
    if(isEmpty(result)){
      setFoundUser(null);
    } else {
      result = new User(result)
      setFoundUser(result);
    }

  }

  const add = async() => {

    if(userState.id===foundUser.id){
      setMessageColor("orange");
      setMessage("Du kannst nicht mit dir selber befreundet sein ;)");
      return;
    }

    const data = {
      userID: userState.id,
      friendID: foundUser.id
    }

    const resp = await postService("user","addFriend",data);

    if(resp===true){
      setMessageColor("green");
      setMessage("Freund wurde hinzugefügt");
      getFriends();
    }

    if(resp===false){
      setMessageColor("orange");
      setMessage("Du bist mit diesem Spieler bereits befreundet");
    }
  }

  const Results = () => {
    if(submitted){

      if(foundUser===null){
        return <p className="pt-3 m-0">Es konnte kein Benutzer gefunden werden...</p>
      }
      return (
      <div className="row pt-3 ps-3">
        <div onClick={add} className="foundUser friend col-10 py-2 px-4">
          <div className="row justify-content-between align-items-center">
            <div className="col-10">
              <div className="row align-items-center">
                <div className="col-3">
                  <img className="player-img square" src={foundUser.picture} alt="Avatar"></img>
                </div>
                <div className="col-9">
                    <p className="m-0 playerNotice-name">{foundUser.username}</p>
                </div>
              </div>
            </div>
            <div className="col-1 px-2 friend-add">
              <i className="fas fa-user-plus"></i>
            </div>
          </div>
        </div>
        <div className="mt-2" style={{color: messageColor}}>
            {message}
        </div>
      </div>
      )
    } else {
      return <></>;
    }
    
  }

    return(
      <div className="popup-wrapper" style={{display: displayState}}>
        <div className="p-4" id="addFriend-container">
          <i onClick={close} className="closeButton fas fa-times-circle"></i>
          <h3>Freund hinzufügen</h3>
          <div className="row">
            <form onSubmit={handleSubmit} className="col-10 col-md-8 ms-2">
              <div className="row">
                <input type="text" className="col-10" value={username} onChange={handleChange}/>
                <button className="col-2 btn"><i className="fas fa-search"></i></button>
              </div>
            </form>
            <Results />
          </div>
        </div>
      </div>
    )
}