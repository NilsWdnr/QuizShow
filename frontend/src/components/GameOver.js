import React, {useContext ,useEffect} from "react";
import { Link } from "react-router-dom";

import postService from "../services/postService";

import { UserContext } from "../context/UserProvider";

export default function GameOver({score, highscore}){
    
    const { userState } = useContext(UserContext);
    

    useEffect(()=>{

        const userID = userState.id;

        const setNewHighscore = async() => {
        
            const data = {
                id: userID,
                highscore: score
            }
    
            await postService("user","setHighscore",data);
    
        }
    
        const addExperiencePoints = async () => {
    
            const ep = Math.round(score/2.5);
    
            const data = {
                id: userID,
                ep: ep
            }
    
            await postService("user","addExperience",data);
            
        }

        if(parseInt(score)>parseInt(highscore)){
            setNewHighscore();
        }

        addExperiencePoints();

    },[score,highscore,userState]);

    const EpMessage = () => {
        return <h4 className="ep my-4">+ {Math.round(score/2.5)} EP</h4>
    }

    const Message = () => {
        if(parseInt(score)>parseInt(highscore)){
            return(
                <>
                    <h2>Spiel Vorbei</h2>
                    <h3>Glückwunsch! Du hast einen neuen persönlichen Highscore aufgestellt.</h3>
                    <h5 className="mt-4">Dein neuer Highscore lautet:</h5>
                    <h4 className="mb-4 score">{score}</h4>
                </>
            )
        } else {
            return (
                <>
                    <h2>Spiel Vorbei</h2>
                    <h3>Dein Score:</h3>
                    <h4 className="score">{score}</h4>
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
                <div className="p-3 col-10 col-md-6 container-style-primary">
                    <Message />
                    <EpMessage />
                    <div className="row">
                        <Link to="/restart">
                            <button className="col-8 col-lg-6 col-xl-4 mb-3 btn btn-primary-color">Nochmal spielen</button>
                        </Link>
                    </div>
                    <div className="row">
                        <Link to="/home">
                            <button className="col-8 col-lg-6 col-xl-4 btn btn-end-game">Spiel beenden</button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}