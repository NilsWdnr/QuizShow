import React, {useContext ,useEffect} from "react";

import { UserContext } from "../context/UserProvider";

export default function GameOver({score, highscore}){

    const { REACT_APP_BACKEND_URL } = process.env;  
    
    const user = useContext(UserContext);
    const userID = user.id;

    console.log(user);

    useEffect(()=>{
        if(parseInt(score)>parseInt(highscore)){
            setNewHighscore();
        }

        addExperiencePoints();
    },[]);

    const setNewHighscore = async() => {
        const data = {
            id: userID,
            highscore: score
        }

        await fetch(`${REACT_APP_BACKEND_URL}/user/setHighscore`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    }

    const addExperiencePoints = async () => {

        const ep = Math.round(score/2.5);

        const data = {
            id: userID,
            ep: ep
        }

        console.log(data);


        await fetch(`${REACT_APP_BACKEND_URL}/user/addExperience`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
    }

    const Message = () => {
        if(parseInt(score)>parseInt(highscore)){
            return(
                <>
                    <h2>Spiel Vorbei</h2>
                    <h3>Glückwunsch! Du hast einen neuen persönlichen Highscore aufgestellt.</h3>
                    <p>Dein neuer Highscore lautet:<br/>
                    {score}</p>
                </>
            )
        } else {
            return (
                <>
                    <h2>Spiel Vorbei</h2>
                    <h3>Dein Score:</h3>
                    <p>{score}</p>
                    <p>Deinen Highscore konntest du damit nicht überbieten<br />
                    Dein Highscore:<br></br>
                    {highscore}</p>
                </>
                )
        }

    }

    return(
        <div className="container-fluid px-3 quiz-wrapper text-center">
            <div className="row justify-content-center">
                <div className="p-3 col-6 container-style-primary">
                    <Message />
                </div>
            </div>
        </div>
    )
}