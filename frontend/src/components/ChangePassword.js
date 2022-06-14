import { useContext, useState } from "react";

import { DisplayContext } from "../pages/Settings";
import { UserContext } from "../context/UserProvider";
import postService from "../services/postService";

export default function ChangePassword(){

  const {display,setDisplay} = useContext(DisplayContext);
  const {userState} = useContext(UserContext);

  const [newPassword, setNewPassword] = useState("");
  const [newPassword_repeat, setNewPassword_repeat] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [newPasswordMessage, setNewPasswordMessage] = useState("");
  const [newPassword_repeatMessage, setNewPassword_repeatMessage] = useState("");
  const [oldPasswordMessage, setOldPasswordMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [success, setSuccess] = useState(false);
  

  const close = () => {
    setDisplay({
      changeUsername: false,
      changePassword: false
    })
    setNewPassword("");
    setNewPassword_repeat("");
    setOldPassword("");

    setNewPasswordMessage("");
    setNewPassword_repeatMessage("");
    setOldPasswordMessage("");
  }

  const handleChange = (e) => {
    const input = e.target.value;

    switch(e.target.id){
      case "newPassword":
          setNewPassword(input);
          break;
      case "newPassword_repeat":
        setNewPassword_repeat(input);
        break; 
      case "oldPassword":
        setOldPassword(input);
        break;     
      default:
        break;                                
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      userID: userState.id,
      newPassword,
      newPassword_repeat,
      oldPassword
    }

    const response = await postService("user","changePassword",data);

    if(!response.success===false){ 
      
      const tokenData = {
        username: userState.username,
        password: newPassword
      }
      const token = await postService("token","getToken",tokenData);

      localStorage.setItem("token",token);
    }

    setSuccess(response.success);
    const messages = response.messages;

    setNewPasswordMessage(messages["newPassword"] ? messages["newPassword"] : "");
    setNewPassword_repeatMessage(messages["newPassword_repeat"] ? messages["newPassword_repeat"] : "");
    setOldPasswordMessage(messages["oldPassword"] ? messages["oldPassword"] : "");  
    setSuccessMessage(messages["success"] ? messages["success"] : "");  

  }

  const ErrorMessage = ({field}) => {

    let message = "";

    switch(field){
      case "newPassword":
        message = newPasswordMessage
        break;
      case "newPassword_repeat":
        message = newPassword_repeatMessage
        break;  
      case "oldPassword":
        message = oldPasswordMessage
        break;  
      case "success":
        message = successMessage
        break;    
      default:
        break;       
    }

    if(message!==""){
      return(<div className="row">
                <div className={"alert ms-2 p-2 col-10 " + (success ? "alert-success" : "alert-danger")} role="alert">{message}</div>
             </div>);
    } else {
      return <></>;
    }
  }

  return <div className="popup-wrapper" style={{display: display.changePassword ? "flex" : "none"}}>
    <div id="changeUsername-container" className="p-4">
      <i onClick={close} className="closeButton fas fa-times-circle"></i>
      <h3>Benutzernamen ändern</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">Neues Passwort</label>
        <div className="row">
          <input onChange={handleChange} className="col-10 px-0 mt-1 mb-2 ms-2" value={newPassword} type="password" name="newPassword" id="newPassword" />
        </div>
        <ErrorMessage field="newPassword"/>
        <label htmlFor="newPassword_repeat">Neues Passwort wiederholen</label>
        <div className="row">
          <input onChange={handleChange} className="col-10 px-0 mt-1 mb-2 ms-2" value={newPassword_repeat} type="password" name="newPassword_repeat" id="newPassword_repeat" />
        </div>
        <ErrorMessage field="newPassword_repeat"/>
        <label htmlFor="oldPassword">Altes Passwort</label>
        <div className="row">
          <input onChange={handleChange} className="col-10 px-0 mt-1 mb-2 ms-2" value={oldPassword} type="password" name="oldPassword" id="oldPassword" />
        </div>
        <ErrorMessage field="oldPassword"/>
        <ErrorMessage field="success"/>
        <button className="btn mt-2">Passwort ändern</button>
      </form>
    </div>
  </div>
}