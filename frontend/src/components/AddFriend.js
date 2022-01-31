import react, { useState, useContext } from "react";
import { AddFriendContext } from "../pages/Friends";

import { UserContext } from "../context/UserProvider";

export default function AddFriend(props){

  const { userState } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [foundUser,setFoundUser] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("")
  const [messageColor, setMessageColor] = useState("");

  const {displayState,setDisplay,getFriends} = useContext(AddFriendContext);

  const { REACT_APP_BACKEND_URL } = process.env;  

  const handleChange = (e) => {
    const input = e.target.value;
    setUsername(input);
  }

  const close = () => {
    setSubmitted(false);
    setMessage("");
    setDisplay("none");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    searchUser();
  }

  const searchUser = () => {
    fetch(`${REACT_APP_BACKEND_URL}/user/search/${username}`)
      .then(res => res.json())
      .then(json => setFoundUser(json))
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

    console.log(props.friends);

    const rawResponse = await fetch(`${REACT_APP_BACKEND_URL}/user/addFriend`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resp = await rawResponse.json();

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

  if(!submitted){
    return(
      <div id="addFriend-wrapper" style={{display: displayState}}>
        <div className="p-4" id="addFriend-container">
        <i onClick={close} id="closeButton" className="fas fa-times-circle"></i>
          <h3>Freund hinzufügen</h3>
          <div className="row">
            <form onSubmit={handleSubmit} className="col-8 ms-2">
              <div className="row">
                <input type="text" className="col-10" value={username} onChange={handleChange}/>
                <button className="col-2 btn"><i className="fas fa-search"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <div id="addFriend-wrapper" style={{display: displayState}}>
        <div className="p-4" id="addFriend-container">
          <i onClick={close} id="closeButton" className="fas fa-times-circle"></i>
          <h3>Freund hinzufügen</h3>
          <div className="row">
            <div onClick={add} className="friend col-10 py-2 px-4">
              <div className="row justify-content-between">
                <div className="col-10">
                  <div className="row">
                    <div className="col-2">
                      <div className="playerNotice-Img"></div>
                    </div>
                    <div className="col-10">
                        <p className="m-0 playerNotice-name">{foundUser.username}</p>
                    </div>
                  </div>
                </div>
                <div className="col-1 playerNotice-arrow"></div>
              </div>
            </div>
          </div>
          <div className="mt-2" style={{color: messageColor}}>
            {message}
          </div>
        </div>
      </div>
    )
  }

}