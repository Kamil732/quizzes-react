import React from 'react'
import { Link } from 'react-router-dom'

function Quiz({ quizzes }) {
    return quizzes.data.map((quiz, index) => (
        <Link to={`/quizzes/${quiz.id}`} className="quiz" key={index}>
            <img
                src={quiz.imageUrl}
                alt={quiz.title}
            />
            <h3 className="title">{quiz.title}</h3>
            <p className="description">{quiz.description}</p>
        </Link>
    ))
}

export default Quiz
