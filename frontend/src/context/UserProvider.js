import React, { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider(props){

  const userDefaultData = {
    loggedIn: false,
    id: null,
    username: null,
    isLoading: true
  }

  const [user, setUser] = useState(userDefaultData);
  const value = {
    userState: user,
    setUser
  }

  return(
    <UserContext.Provider value={value}>
        {props.children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };