import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Question from '../components/Question'
import Request from  '../components/Request'
import { useAxiosGet } from '../hooks/HttpRequest'


export const PointsContext = React.createContext(0);
export const CountOfQuestionsContext = React.createContext(0);
export const AnsweredQuestionsContext = React.createContext(0)

function QuizDetail() {
    const { id } = useParams()
    const URL = `https://5fa5ba03085bf700163ddfda.mockapi.io/api/v1/quizzes/${id}`
    const quiz = useAxiosGet(URL)

    const [points, setPoints] = useState(0)
    const [countOfQuestions, setCountOfQuestions] = useState(0)
    const [answeredQuestions, setAnsweredQuestions] = useState(0)

    return (
        <PointsContext.Provider value={[points, setPoints]}>
            <CountOfQuestionsContext.Provider value={[countOfQuestions, setCountOfQuestions]}>
                <AnsweredQuestionsContext.Provider value={[answeredQuestions, setAnsweredQuestions]}>
                    {
                        quiz.data ? (
                            <div className="quiz-card">
                                <img
                                    src={quiz.data.imageUrl}
                                    alt={quiz.data.title}
                                />
                                <h4><Link to={`/quiz/${quiz.data.id}/create-question`}>Add Question</Link></h4>
                                <h3 className="title">{quiz.data.title}</h3>
                                <p className="description">{quiz.data.description}</p>
                                <ul className="quiz-questions">
                                    <Question
                                        quiz={quiz}
                                    />
                                </ul>

                                {
                                    countOfQuestions - answeredQuestions === 0 ? (
                                        <h4>
                                            Zdobyłeś {points}/{countOfQuestions} punkt
                                            { points === 0 || points > 4 ? 'ów' : ''}
                                            { points > 1 && points < 5 ? 'y' : '' }
                                        </h4>
                                    ) : (
                                        <h4>Musisz jeszcze odpowidzieć na {countOfQuestions - answeredQuestions} pytań</h4>
                                    )
                                }
                            </div>
                        ) : <></>
                    }

                    <Request request={quiz} />
                </AnsweredQuestionsContext.Provider>
            </CountOfQuestionsContext.Provider>
        </PointsContext.Provider>
    )
}

export default QuizDetail