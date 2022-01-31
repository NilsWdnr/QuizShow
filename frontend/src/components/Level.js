import React, {useContext, useEffect, useState} from "react";

import { UserContext } from "../context/UserProvider";

export default function Level(props){

  const { REACT_APP_BACKEND_URL } = process.env;

  const { userState } = useContext(UserContext);

  const [playerLevel, setPlayerLevel] = useState(0);
  const [playerEp, setPlayerEp] = useState(0);

  useEffect(() => {

    const userID = userState.id;

    fetch(`${REACT_APP_BACKEND_URL}/user/getExperiencepoints/${userID}`)
        .then(res=>res.json())
        .then(json=>calculateLevel(json))

  }, [playerLevel])

  useEffect(() => {

    if(props.getEp!==undefined&&props.getLevel!==undefined){
      passData();
    }

  }, [playerLevel])

  
  function calculateLevel(ep){

    ep = parseInt(ep);
    setPlayerEp(ep);

    const level = Math.ceil((ep+1)/10000);
    setPlayerLevel(level);

    
  }

  function passData(){
    console.log("Spielerlevel: " + playerLevel);
    props.getEp(playerEp);
    props.getLevel(playerLevel);
  }

  return(<>{playerLevel}</>)

}

