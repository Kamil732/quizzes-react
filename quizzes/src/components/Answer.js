import React, { useContext, useState } from 'react'
import { useAxiosGet } from '../hooks/HttpRequest'
import { AnsweredQuestionsContext, PointsContext } from '../views/QuizDetail'
import Request from './Request'

function Answer({ question }) {
    const [answered, setAnswered] = useState(null)
    const [points, setPoints] = useContext(PointsContext)
    const [answeredQuestions, setAnsweredQuestions] = useContext(AnsweredQuestionsContext)

    const handleAnswer = answer => {
        setAnswered(answer)
        setAnsweredQuestions(answeredQuestions + 1)

        // Add point if the answer is correct
        if (answer.isCorrect) {
            setPoints(points + 1)
        }
    }

    // Get answers data
    const URL = `https://5fa5ba03085bf700163ddfda.mockapi.io/api/v1/quizzes/${question.quizzId}/questions/${question.id}/answers`
    const answers = useAxiosGet(URL)

    const getButton = answer => {
        // The default btn
        let btn = (
            <button
                className="answer"
                key={answer.id}
                onClick={() => handleAnswer(answer)}
            >
                {answer.answer}
            </button>
        )

        // Color answers
        if (answered) {
            // Color every answer if it's correct
            if (answer.isCorrect) {
                btn = (
                    <button
                        className="answer"
                        style={{ backgroundColor: 'green', color: 'white' }}
                        key={answer.id}
                    >
                        {answer.answer}
                    </button>
                )
            } else if (answered === answer) {
                // Color red the choosen answer if it's incorrect
                btn = (
                    <button
                        className="answer"
                        style={{ backgroundColor: 'red', color: 'white' }}
                        key={answer.id}
                    >
                        {answer.answer}
                    </button>
                )
            } else {
                // Make the rest of answers unclickable
                btn = (
                    <button
                        key={answer.id}
                        className="btn disabled"
                    >
                        {answer.answer}
                    </button>
                )
            }
        }

        return btn
    }

    if (answers.data) {
        return answers.data.map((answer, index) => (
            <li key={index}>
                {getButton(answer)}

            </li>
        ))
    }
    return <Request request={answers} />
}

export default Answer
