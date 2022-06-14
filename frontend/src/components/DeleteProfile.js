import {useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/UserProvider";
import { DisplayContext } from "../pages/Settings";

import postService from "../services/postService";

export default function DelteProfile (){

  const {userState} = useContext(UserContext); 
  const {display,setDisplay} = useContext(DisplayContext);

  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [deleted, setDeleted] = useState(false)

  const close = () => {
    setDisplay({
      changeUsername: false,
      changePassword: false,
      deleteProfile: false
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: userState.username,
      password
    }

    const response = await postService("user","login",data);

    if(response.success===true){
      setSubmitted(true);
    } else {
      setMessage("Das Passwort ist nicht korrekt");
    }

  }

  const handleChange = (e) => {
    const input = e.target.value;
    setPassword(input);
  }

  const deleteUser = async () => {

    const data = {
      userID: userState.id
    }

    const response = await postService("user","delete",data);

    if(response===true){
      setDeleted(true);
    }
  }

  if(submitted===true){

    if(deleted){
      return <Navigate replace to="/logout" />
    }

    return (
      <div className="popup-wrapper" style={{display: display.deleteProfile ? "flex" : "none"}}>
        <div id="changeUsername-container" className="p-4">
          <i onClick={close} className="closeButton fas fa-times-circle"></i>
          <h3>Konto löschen</h3>
          <p>Möchtest du dein Konto endgültig löschen?</p>
          <div className="row justify-content-around">
            <div className="btn btn-danger col-5" onClick={deleteUser}>Konto löschen</div>
            <div className="btn btn-light col-5" onClick={close}>Abbrechen</div>
          </div>
        </div>
      </div>
    );

  } else {

    return (
      <div className="popup-wrapper" style={{display: display.deleteProfile ? "flex" : "none"}}>
        <div id="changeUsername-container" className="p-4">
          <i onClick={close} className="closeButton fas fa-times-circle"></i>
          <h3>Konto löschen</h3>
          <form onSubmit={handleSubmit}>
            <label className="mt-2 pb-1" htmlFor="password">Bitte bestätige dein Passwort</label>
            <div className="row">
              <input onChange={handleChange} className="col-10 px-0 ms-2" value={password} type="password" name="password" id="password" />
            </div>
            <div className="py-2">{message}</div>
            <button className="btn">Konto löschen</button>
          </form>
        </div>
      </div>
      );
  }

}