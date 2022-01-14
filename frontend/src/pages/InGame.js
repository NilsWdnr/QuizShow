import React, { useState, useEffect, useRef } from "react";
import {lowerFirst, range} from "lodash";

import GameOver from "../components/GameOver";


export default function InGame (){

    const { REACT_APP_BACKEND_URL } = process.env;

    const [highscore, setHighscore] = useState(0);
    const [question, setQuestion] = useState("");
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState(5);
    const [usedQuestions, setUsedQuestions] = useState([]);
    const [timer, setTimer] = useState(null);
    
    const answersContainer = useRef(null);
    const answerButton1 = useRef(null);
    const answerButton2 = useRef(null);
    const answerButton3 = useRef(null);
    const answerButton4 = useRef(null);
    const nextQuestionButton = useRef(null);
    const timeBar = useRef(null);

    let timeLeft;

    const answerButtons = [answerButton1,answerButton2,answerButton3,answerButton4];

    useEffect(() => {

        getHighscore();
        setUpQuestion();
    }, [])

    const setUpQuestion = () => {

        answersContainer.current.style.pointerEvents = "all";


        fetch(`${REACT_APP_BACKEND_URL}/question/randomQuestion`)
        .then(data=>data.json())
        .then(json=>checkQuestion(json))

        answerButtons.forEach((e)=>{
            e.current.style.backgroundColor = "#8D188D";
        })

    }

    const startTimer = () => {

        timeLeft = 100.00;

        const interval = setInterval(()=>{
            timeLeft = timeLeft - 1;
            timeBar.current.style.width = timeLeft + "%";
            if(timeLeft===0){
                clearInterval(interval);
                checkAnswer(null);
            }
        },100)

        setTimer(interval);
    }

    const getHighscore = () => {

        const userID = sessionStorage.userID;

        fetch(`${REACT_APP_BACKEND_URL}/user/getHighscore/${userID}`)
        .then(data=>data.json())
        .then(json=>setHighscore(json));

    }

    const checkAnswer = (e) => {

        resetTimer();

        answersContainer.current.style.pointerEvents = "none";

        const newUsedQuestions = [...usedQuestions,question.id];
        setUsedQuestions(newUsedQuestions);

        const correctAnswer = question.KorrekteAntwort;

        if(e!==null){

            const clickedButton = e.target;
            const innerText = e.target.innerText;
            
            if(innerText===correctAnswer){
                clickedButton.style.backgroundColor = "green";
                setScore(score+100)
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

    const checkQuestion = (newQuestion) => {
        const newQuestionID = newQuestion.id;
        let questionUsed = false;

        if(usedQuestions.length===0){
            setQuestion(newQuestion);
            startTimer();
        } else {

            usedQuestions.forEach((usedQuestionID)=>{
                if(newQuestionID===usedQuestionID){
                    questionUsed = true;
                }
            })

            if(questionUsed===false){
                setQuestion(newQuestion);
                startTimer();
            } else {
                setUpQuestion();
            }    

        }

    }

    const nextQuestion = () => {
        toggleButton();
        setUpQuestion();
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
    
    function resetTimer() {
        clearInterval(timer);
    }

    if(hearts>0){
        return(
            <>
                <div id="score-container"className="col-12 pt-2 col-sm-auto">
                    <p className="m-0">Highscore: <span className="" id="personal-highscore">{highscore}</span></p>
                    <p>Score: <span id="score">{score}</span></p>
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
                                    <button id="nextQuestionButton" onClick={nextQuestion} ref={nextQuestionButton} className="col-8 py-3">Nächste Frage</button>
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