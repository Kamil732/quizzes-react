import React from 'react'
import Quiz from '../components/Quiz'
import { useAxiosGet } from '../hooks/HttpRequest'


function QuizList() {
    const URL = 'https://5fa5ba03085bf700163ddfda.mockapi.io/api/v1/quizzes'
    const quizzes = useAxiosGet(URL)

    return (
        <ul className="quiz-list">
            {
                quizzes.data ? (
                    <Quiz
                        quizzes={quizzes}
                    />
                ) : <></>
            }
            {
                quizzes.error ? (
                    <code>{quizzes.error}</code>
                ) : <></>
            }
            {
                quizzes.loading ? (
                    <div className="loader"></div>
                ) : <></>
            }
        </ul>
    )
}

export default QuizList
