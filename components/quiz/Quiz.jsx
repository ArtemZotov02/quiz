import React, { useState } from 'react';
import style from './style.module.scss';
import QuizResults from '../quizRezult/quizRezult';

export default function Quiz({ questions }) {
    const [questionNumber, setQuestionNumber] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [activeIndex, setActiveIndex] = useState(null)
    const [answered, setAnswered] = useState(false)
    const [allCorrectAnswers, setAllCorrectAnswers] = useState(0)

    const acceptAnswer = (i, isCorrect) => {
        if (answered) return
        setActiveIndex(i)
        setAnswered(true)

        if (isCorrect) {
            setCorrectAnswer('green')
            setAllCorrectAnswers(allCorrectAnswers + 1)
        } else {
            setCorrectAnswer('red')
        }
    };

    const nextQuestion = () => {
        setCorrectAnswer('')
        setQuestionNumber(questionNumber + 1)
        setActiveIndex(null)
        setAnswered(false)
        
    };

    const restartQuiz = () => {
        setQuestionNumber(0)
        setAllCorrectAnswers(0)
    };

    return (
        <div className={style.quizBlock}>
            {questionNumber != questions.length ? (
                <div className={style.questionBlock}>
                    <div className={style.questionNumber}> Question {questionNumber + 1} of {questions.length}</div>
                    <div className={style.question}>
                        <p className={style.questionTitle}>{questions[questionNumber].question}</p>
                        {questions[questionNumber].answers.map((answer, i) => (
                            <span
                                key={i}
                                className={`
                                    ${style.questionAnswer} 
                                    ${activeIndex === i && correctAnswer === 'green' ? style.true : ''} 
                                    ${activeIndex === i && correctAnswer === 'red' ? style.false : ''} 
                                    ${activeIndex === i && correctAnswer === '' ? '' : ''}
                                `}
                                onClick={() => acceptAnswer(i, answer.isCorrect)}
                            >
                                {answer.text}
                            </span>
                        ))}
                        <button className={style.questionNextBtn} onClick={nextQuestion}>
                            {questionNumber === questions.length - 1 ? 'FINISH' : 'Next'}
                        </button>
                    </div>
                </div>
            ) : (
                <QuizResults allCorrectAnswers={allCorrectAnswers} restartQuiz={restartQuiz}  questions={questions}/>
            )}
        </div>
    );
}
