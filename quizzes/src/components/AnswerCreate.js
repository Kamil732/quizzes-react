import React from 'react'

function AnswerCreate({ amount }) {
    return (
        <>
            {
                [...Array(amount)].map((x, i) => (
                    <div key={i}>
                        <label>Answer {i+1}</label>
                        <input
                            type="text"
                            name={`answer${i+1}`}
                            placeholder={`Answer ${i+1}...`}
                        />
                        <input
                            type="radio"
                            name="isCorrect"
                            value={`answer${i+1}`}
                        />
                    </div>
                ))
            }
        </>
    )
}

export default AnswerCreate
