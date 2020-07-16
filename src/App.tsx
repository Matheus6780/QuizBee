import React, { useState, useEffect } from 'react';
import './assets/style.css';
import quizService from './quizService'
import QuestionBox from './components/QuestionBox'
import Result from './components/Result'

interface Question {

  question: string,
  answers: string[],
  correct: string,
  questionId: string
}

const App: React.FC = () => {

  const [ questionBank, setQuestionBank ] = useState<Question[]>([])
  const [ score, setScore ] = useState(0)
  const [ responses, setResponses ] = useState(0)

  useEffect(() => {

    const fillQuestionBank = async () => {
      const data = await quizService()
      
      setQuestionBank(data)
    }

    fillQuestionBank()

  }, [])

  const computeAnswer = (answer: string, correctAnswer: string) => {

    if (answer === correctAnswer) {
      setScore(score + 1)
    }

    if (responses < 5) 
      setResponses(responses + 1)
    else
      setResponses(5)
  }

  const playAgain = () => {
    setScore(0)
    setResponses(0)
  }

  return (
    <div className="container">
      <div className='title'>QuizBee</div>

      { questionBank.length > 0 && responses < 5 &&
      
      questionBank.map(({ questionId, answers, correct, question }) => (
        <QuestionBox key={questionId} question={question} options={answers}
        selected={ (answer: string) => computeAnswer(answer, correct)}
        />
          
      ))}
      
      {responses === 5 ? (<Result score={score} playAgain={playAgain}>{score}</Result>) : null}
    </div>
  );
}

export default App;
