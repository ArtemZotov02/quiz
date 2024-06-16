import React from 'react';
import style from './style.module.scss';

export default function QuizResults({ allCorrectAnswers, restartQuiz, questions }) {
    return (
        <div className={style.correctAnswerBlock}>
            <p>Правильных ответов {allCorrectAnswers} из {questions.length}</p>
            <button className={style.questionNextBtn} onClick={restartQuiz}>AGAIN </button>
        </div>
    );
}