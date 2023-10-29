import React from 'react'
import './App.css'
import QuizList from './views/QuizList'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from 'react-router-dom'
import QuizDetail from './views/QuizDetail'
import QuizCreate from './views/QuizCreate'
import QuestionCreateForm from './components/QuestionCreateForm'

function App() {
	return (
		<>
			<Router>
				<h1>
					<Link to="/">Home</Link>
				</h1>
				<Switch>
					<Route exact path="/quizzes">
						<h1>
							<Link to="/create-quiz">Create a Quiz</Link>
						</h1>
						<QuizList />
					</Route>
					<Route path="/quizzes/:id">
						<QuizDetail />
					</Route>
					<Route exact strict path="/create-quiz">
						<QuizCreate />
					</Route>
					<Route exact strict path="/quiz/:id/create-question">
						<QuestionCreateForm />
					</Route>
					<Redirect from="/" to="/quizzes" />
				</Switch>
			</Router>
		</>
	)
}

export default App
