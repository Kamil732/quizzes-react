import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { AxiosPost } from '../hooks/HttpRequest'

function QuizCreateForm() {
	const [quizRedirect, setQuizRedirect] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const URL = 'https://5fa5ba03085bf700163ddfda.mockapi.io/api/v1/quizzes'
		const formData = await AxiosPost(URL, e.target)

		setQuizRedirect(`/quiz/${formData.id}/create-question`)
	}

	return (
		<>
			{quizRedirect ? (
				<Redirect to={quizRedirect} />
			) : (
				<form method="POST" onSubmit={handleSubmit}>
					<label>Title</label>
					<input type="text" name="title" placeholder="Title..." />

					<label>Descirption</label>
					<input
						type="text"
						name="description"
						placeholder="descirption..."
					/>

					<button>Submit</button>
				</form>
			)}
		</>
	)
}
export default QuizCreateForm
