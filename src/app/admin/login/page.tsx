// Admin login page
'use client';

import { useState } from 'react';

const sampleQuiz = {
  title: 'Bhagavad Gita Quiz',
  questions: [
    {
      id: 'q1',
      question: 'Who is the speaker of Bhagavad Gita?',
      options: ['Arjuna', 'Krishna', 'Bhishma', 'Duryodhana'],
      answer: 'Krishna',
    },
    {
      id: 'q2',
      question: 'How many chapters are there in Bhagavad Gita?',
      options: ['18', '12', '15', '20'],
      answer: '18',
    },
  ],
};

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(option: string) {
    if (option === sampleQuiz.questions[currentQ].answer) {
      setScore((s) => s + 1);
    }
    if (currentQ + 1 < sampleQuiz.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{sampleQuiz.title}</h1>

      {!showResult ? (
        <div>
          <p className="mb-4 font-semibold">
            Q{currentQ + 1}. {sampleQuiz.questions[currentQ].question}
          </p>
          <div className="flex flex-col gap-3">
            {sampleQuiz.questions[currentQ].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="p-3 border rounded hover:bg-blue-100"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xl font-semibold">
            Your Score: {score} / {sampleQuiz.questions.length}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              setCurrentQ(0);
              setScore(0);
              setShowResult(false);
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
