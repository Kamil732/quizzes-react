import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AxiosPost } from '../hooks/HttpRequest'
import AnswerCreate from './AnswerCreate'

function QuestionCreateForm() {
    const [answersAmount, setAnswersAmount] = useState(4)
    const { id } = useParams()

    const handleSubmit = async e => {
        e.preventDefault()

        const CREATE_QUESTION_URL = `https://5fa5ba03085bf700163ddfda.mockapi.io/api/v1/quizzes/${id}/questions`
        const question = await AxiosPost(CREATE_QUESTION_URL, null, {
            quizzId: id,
            question: e.target.question.value,
        })

        const CREATE_QUESTION_ANSWERS_URL = `https://5fa5ba03085bf700163ddfda.mockapi.io/api/v1/quizzes/${id}/questions/${question.id}/answers`
        for (let i=0; i<answersAmount; i++) {
            await AxiosPost(CREATE_QUESTION_ANSWERS_URL, null, {
                questionId: question.id,
                answer: e.target[`answer${i+1}`].value,
                isCorrect: e.target.isCorrect.value === `answer${i+1}` ? true : false,
            })
        }
    }

    const handleAddAnswer = e => {
        e.preventDefault()
        setAnswersAmount(answersAmount < 8 ? answersAmount + 1 : answersAmount)
    }

    const handleRemoveAnswer = e => {
        e.preventDefault()
        setAnswersAmount(answersAmount > 2 ? answersAmount - 1 : answersAmount)
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <label>Question</label>
            <input
                type="text"
                name="question"
                placeholder="Question..."
            />
            <hr />

            <div className="answers">
                <AnswerCreate amount={answersAmount} />
            </div>
            <button onClick={handleAddAnswer}>Add answer</button>
            <button onClick={handleRemoveAnswer}>Remove answer</button>

            <button>Submit</button>
        </form>
    )
}

export default QuestionCreateForm