import React, { useContext } from 'react'
import { useAxiosGet } from '../hooks/HttpRequest'
import Answer from './Answer'
import { CountOfQuestionsContext } from '../views/QuizDetail'
import Request from './Request'

function Question({ quiz }) {
    const URL = `https://5fa5ba03085bf700163ddfda.mockapi.io/api/v1/quizzes/${quiz.data.id}/questions`
    const questions = useAxiosGet(URL)

    // eslint-disable-next-line
    const [countOfQuestions, setCountOfQuestions] = useContext(CountOfQuestionsContext)

    if(questions.data) {
        setCountOfQuestions(questions.data.length)

        return questions.data.map((question, index) => (
            <li key={index}>
                <h3 className="question">{question.question}</h3>
                <ul className="question-answers">
                    <Answer
                        question={question}
                    />
                </ul>
            </li>
        ))
    }
    return <Request request={questions} />
}

export default Question
