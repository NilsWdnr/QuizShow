import { useContext, useState } from "react";

import { DisplayContext } from "../pages/Settings";
import { UserContext } from "../context/UserProvider";
import postService from "../services/postService";

export default function ChangeUsername(){

  const {display,setDisplay} = useContext(DisplayContext);
  const {userState,setUser} = useContext(UserContext);

  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");

  const close = () => {
    setDisplay({
      changeUsername: false,
      changePassword: false
    })
    setNewUsername("");
    setMessage("");
  }

  const handleChange = (e) => {
    const input = e.target.value;
    setNewUsername(input);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newUsername===userState.username){
      setMessage("Das ist bereits dein Benutzername");
      return;
    }
    
    const data = {
      userID: userState.id,
      username: newUsername
    }

    const response = await postService("user","changeUsername",data);

    if(response.success===true){

      const newUserState = {...userState};
      newUserState.username = newUsername;
      setUser(newUserState);

      // neuen Token und dabei das Passwort aus dem alten übernehmen

      const decodedToken = await postService("token","decode",localStorage.getItem("token"));
      const password = decodedToken["password"];

      const newTokenData = {
        username: newUsername,
        password: password
      }
      const newToken = await postService("token","getToken",newTokenData);

      localStorage.setItem("token",newToken);

    }

    setMessage(response.message);
  }

  return <div className="popup-wrapper" style={{display: display.changeUsername ? "flex" : "none"}}>
    <div id="changeUsername-container" className="p-4">
      <i onClick={close} className="closeButton fas fa-times-circle"></i>
      <h3>Benutzernamen ändern</h3>
      <form onSubmit={handleSubmit}>
        <label className="mt-2 pb-1" htmlFor="new_username">Neuer Benutzername</label>
        <div className="row">
          <input onChange={handleChange} className="col-10 px-0 ms-2" value={newUsername} type="text" name="new_username" id="new_username" />
        </div>
        <div className="py-2">{message}</div>
        <button className="btn">Username ändern</button>
      </form>
    </div>
  </div>
}