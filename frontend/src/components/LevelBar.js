import { useEffect, useState } from "react";

import Level from "./Level";

export default function LevelBar(){

  const [ep, setEp] = useState(0);
  const [epCount, setEpCount] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(0);
  const [levelBarWidth, setLevelBarWidth] = useState("0%");
  
  useEffect(()=>{

    // Calculate level bar

    const reference = 5000 * (playerLevel-1);
    let refEp = ep - reference;
    let progress = refEp/50;
    setLevelBarWidth(progress+"%");

    setEpCount(refEp);

  },[playerLevel,ep])

  const getEp = (val) => {
    setEp(val);
  }

  const getLevel = (val) => {
    setPlayerLevel(val);
  }

  return(
    <div className="ms-2 player-level">
      <Level getEp={getEp} getLevel={getLevel}/>
      <div id="levelBar">
        <div id="levelBarInner" style={{width: levelBarWidth}}>  </div>
      </div>
      <div id="levelBarOverlay" className="d-flex justify-content-center align-items-center">
        {epCount.toLocaleString()}/5.000 EP
      </div>
    </div>
  )

}