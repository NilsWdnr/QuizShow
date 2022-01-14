import React, {useEffect, useState} from "react";

export default function TimerTest (){

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(()=>{
      setCounter(counter => counter+1);
      console.log(counter);
    },1000)
  }, [])

  return(<h1>{counter}</h1>);
}