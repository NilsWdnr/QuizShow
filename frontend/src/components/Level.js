import React, {useContext, useEffect, useState} from "react";

import getService from "../services/getService";

import ProfileContext from "../context/ProfileContext";

export default function Level({getEp,getLevel}){

  const Profile = useContext(ProfileContext);

  const [playerLevel, setPlayerLevel] = useState(0);
  const [playerEp, setPlayerEp] = useState(0);

  useEffect(() => {

    function calculateLevel(ep){

      ep = parseInt(ep);
      setPlayerEp(ep);
  
      const level = Math.ceil((ep+1)/5000);
      setPlayerLevel(level);
  
      
    }
   
    if(Profile.id!==null&&Profile.id!==undefined){
      getService("user","getExperiencepoints",Profile.id)    
        .then(json=>calculateLevel(json))
    } else if (Profile.ep!==undefined){
      calculateLevel(Profile.ep);
    }   

  }, [Profile])

  useEffect(() => {
 
    function passData(){
      
      getEp(playerEp);
      getLevel(playerLevel);
    }

    if(getEp!==undefined&&getLevel!==undefined){
      passData();
    }


  }, [playerLevel,playerEp,getEp,getLevel])

  return(<>{playerLevel}</>)

}

