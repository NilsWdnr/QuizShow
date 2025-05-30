import React, { useContext, useState, useEffect, useRef } from "react";
import { range } from "lodash";

import getService from "../services/getService";
import postService from "../services/postService";

import { UserContext } from "../context/UserProvider";

import GameOver from "../components/GameOver";


export default function InGame (){

    const { userState } = useContext(UserContext);
    const userID = userState.id;

    const [highscore, setHighscore] = useState(0);
    const [question, setQuestion] = useState("");
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState(5);
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [timerState, setTimerState] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    
    const answersContainer = useRef(null);
    const answerButton1 = useRef(null);
    const answerButton2 = useRef(null);
    const answerButton3 = useRef(null);
    const answerButton4 = useRef(null);
    const nextQuestionButton = useRef(null);
    const timeBar = useRef(null);

    let interval;

    const answerButtons = [answerButton1,answerButton2,answerButton3,answerButton4];

    useEffect(() => {

        getHighscore();
        setUpQuestion();

    }, []) // eslint-disable-line react-hooks/exhaustive-deps



    useEffect(() => {

        if (timerState==="running"){
            let timeLeft = 100.00;

            interval = setInterval(()=>{ // eslint-disable-line react-hooks/exhaustive-deps
                timeLeft = timeLeft - 1;
                timeBar.current.style.width = timeLeft + "%";
                if(timeLeft===0){
                    clearInterval(interval);
                    setTimerState("over");
                }
            },100)
        } else if(timerState==="over"){
            clearInterval(interval);
            checkAnswer();
        } else if(timerState==="stopped"){
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }

    }, [timerState])



    const setUpQuestion = async() => {

        answersContainer.current.style.pointerEvents = "all";

        answerButtons.forEach((e)=>{
            e.current.style.backgroundColor = "#8D188D";
        })
       
        const data = {
            usedQuestions
        }

        const response = await postService("question","randomQuestion",data); 

        // Spiel beenden, falls alle Fragen aus der Datenbank aufgebraucht wurden

        if(response.length===0){
            setGameOver(true);
            return;
        }

        setUsedQuestions ([...usedQuestions,response.id]);

        setQuestion(response);
        setTimerState("running");

    }

    const getHighscore = () => {

        getService("user","getHighscore",userID)
            .then(res=>setHighscore(res));

    }

    const checkAnswer = (e = null) => {

        setTimerState("stopped");

        answersContainer.current.style.pointerEvents = "none";

        const correctAnswer = question.KorrekteAntwort;

        if(e!==null){

            const clickedButton = e.target;
            const innerText = e.target.innerText;
            
            if(innerText===correctAnswer){
                clickedButton.style.backgroundColor = "green";
                setScore(score+(question.Schwierigkeitsstufe * 100));
            } else {
                clickedButton.style.backgroundColor = "red";
    
                answerButtons.forEach((e)=>{
                    if(e.current.innerText===correctAnswer){
                        e.current.style.backgroundColor = "green";
                    }
                })
    
                setHearts(hearts-1);
      
            }

        } else {

            answerButtons.forEach((e)=>{
                if(e.current.innerText===correctAnswer){
                    e.current.style.backgroundColor = "green";
                }
            })

            setHearts(hearts-1);
        }

        toggleButton();
    } 

    const nextQuestion = () => {
        if(hearts===0){
            setGameOver(true);
        } else {
            toggleButton();
            setUpQuestion();
        }    

    }

    const toggleButton = () => {
        nextQuestionButton.current.classList.toggle("visible");
    }


    const HeartIcons = () => {

        const heartsArray = range (1, hearts+1);

        return <div id="hearts-container">{heartsArray.map((e)=>{
            return <i key={e} className="fas fa-heart"></i>
        })}</div>;
    }
    

    if(!gameOver){
        return(
            <>
                <div id="score-container"className="col-12 pt-2 col-sm-auto m-0 ps-3">
                    <p className="m-0">Highscore: <span className="" id="personal-highscore">{highscore}</span></p>
                    <p className="mb-0">Score: <span id="score">{score}</span></p>
                    <HeartIcons />
                </div>

                <main>
                    <div className="container-fluid px-3 quiz-wrapper">
                        <div className="row justify-content-center">
                            <div className="pt-5 col-12 col-lg-10 col-xl-7" id="questionContainer">
                                <h2 id="questionText">{question.Fragestellung}</h2>
                                <div id="timeBar" ref={timeBar}></div>
                                <div id="answersContainer" ref={answersContainer}>
                                    <div className="row justify-content-between mt-4">
                                        <div className="col-6">
                                            <div id="answerButton1" onClick={checkAnswer} ref={answerButton1} className="answerButton text-center col-12">
                                                {question.Antwort1}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div id="answerButton2" onClick={checkAnswer} ref={answerButton2} className="answerButton text-center col-12">
                                                {question.Antwort2}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between mt-3">
                                        <div className="col-6">
                                            <div id="answerButton3" onClick={checkAnswer} ref={answerButton3} className="answerButton text-center col-12">
                                                {question.Antwort3}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div id="answerButton4" onClick={checkAnswer} ref={answerButton4} className="answerButton text-center col-12">
                                                {question.Antwort4}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center mt-3">
                                    <button id="nextQuestionButton" onClick={nextQuestion} ref={nextQuestionButton} className="col-8 py-3">{ hearts > 0 ? "Nächste Frage" : "Zur Auswerung" }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        ) 
    } else {
        
        return <GameOver score={score} highscore={highscore}/>;
    
    }
}