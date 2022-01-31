import react, { useEffect, useState } from "react";

import Level from "./Level";

export default function LevelBar(){

  const [ep, setEp] = useState(0);
  const [epCount, setEpCount] = useState(0);
  const [playerLevel, setPlayerLevel] = useState(0);
  const [levelBarWidth, setLevelBarWidth] = useState("0%");

  useEffect(()=>{
    calculateLevelBar();
  },[playerLevel])

  const getEp = (val) => {
    setEp(val);
  }

  const getLevel = (val) => {
    setPlayerLevel(val);
  }

  const calculateLevelBar = () => {
    const reference = 10000 * (playerLevel-1);
    let refEp = ep - reference;
    let progress = refEp/100;
    setLevelBarWidth(progress+"%");

    setEpCount(refEp);
}



  return(
    <div className="ms-2 player-level">
      <Level getEp={getEp} getLevel={getLevel} />
      <div id="levelBar">
        <div id="levelBarInner" style={{width: levelBarWidth}}>  </div>
      </div>
      <div id="levelBarOverlay" className="d-flex justify-content-center align-items-center">
        {epCount}/10000 EP
      </div>
    </div>
  )

}