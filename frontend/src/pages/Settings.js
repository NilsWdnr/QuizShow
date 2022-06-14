import {createContext, useState} from "react";
import { Link } from "react-router-dom";

import ChangeUsername from "../components/ChangeUsername";
import ChangePassword from "../components/ChangePassword";
import DelteProfile from "../components/DeleteProfile";

const DisplayContext = createContext();

export default function Settings(){

  const [display, setDisplay] = useState({
    changeUsername: false,
    changePassword: false,
    deleteProfile: false
  });

  const value = {
    display,
    setDisplay
  }

  const toggleChangeUsername = () => {
    setDisplay({
      changeUsername: true,
      changePassword: false,
      deleteProfile: false,
    })
  }

  const toggleChangePassword = () => {

    setDisplay({
      changeUsername: false,
      changePassword: true,
      deleteProfile: false
    })
  }

  const toggleDeleteProfile = () => {

    setDisplay({
      changeUsername: false,
      changePassword: false,
      deleteProfile: true
    })
  }  

  return(
    <DisplayContext.Provider value={value}>
      <ChangeUsername />
      <ChangePassword />
      <DelteProfile />
      <main>
        <div className="container-md my-5">
            <h2 className="text-center pb-3">Einstellungen</h2>
            <div className="row justify-content-center mb-3">
              <div onClick={toggleChangeUsername} className="option mx-auto p-3 col-10 col-sm-6 col-lg-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <i className="fas fa-user pe-3"></i> Benutzernamen ändern
                    </div>
                    <div className="col-1 playerNotice-arrow"></div>
                  </div>
              </div>
            </div>
            <div className="row justify-content-center mb-3"> 
              <div onClick={toggleChangePassword} className="option mx-auto p-3 col-10 col-sm-6 col-lg-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="fas fa-lock pe-3"></i> Passwort ändern
                  </div>
                  <div className="col-1 playerNotice-arrow"></div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center mb-3"> 
              <div onClick={toggleDeleteProfile} className="option mx-auto p-3 col-10 col-sm-6 col-lg-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <i className="fa-solid fa-trash pe-3"></i> Konto löschen
                  </div>
                  <div className="col-1 playerNotice-arrow"></div>
                </div>
              </div>
            </div>
            <div className="text-center">  
              <Link to="/logout">
                <button type="button" className="btn btn-danger">
                  <i className="fas fa-sign-out-alt"></i> Abmelden
                </button>
              </Link>
            </div>
        </div>
      </main>
    </DisplayContext.Provider>
  )
}

export { DisplayContext };