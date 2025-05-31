// Admin quiz dashboard
'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebaseClient';
import { useRouter } from 'next/navigation';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { question: '', options: ['', '', '', ''], answer: '' },
  ]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {
    const snapshot = await getDocs(collection(db, 'quizzes'));
    setQuizzes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  }

  function handleQuestionChange(idx: number, field: string, value: string) {
    const newQuestions = [...questions];
    if (field === 'question') {
      newQuestions[idx].question = value;
    } else if (field.startsWith('option')) {
      const optionIndex = Number(field.slice(-1));
      newQuestions[idx].options[optionIndex] = value;
    } else if (field === 'answer') {
      newQuestions[idx].answer = value;
    }
    setQuestions(newQuestions);
  }

  function addQuestion() {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  }

  function removeQuestion(idx: number) {
    setQuestions(questions.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert('Quiz title required');
      return;
    }
    // Basic validation for questions
    for (const q of questions) {
      if (!q.question.trim()) {
        alert('All questions must have text');
        return;
      }
      if (q.options.some(o => !o.trim())) {
        alert('All options must be filled');
        return;
      }
      if (!q.answer.trim()) {
        alert('Answer required for all questions');
        return;
      }
    }

    try {
      await addDoc(collection(db, 'quizzes'), { title, questions });
      alert('Quiz saved');
      setTitle('');
      setQuestions([{ question: '', options: ['', '', '', ''], answer: '' }]);
      fetchQuizzes();
    } catch (error) {
      alert('Error saving quiz');
    }
  }

  async function deleteQuiz(id: string) {
    await deleteDoc(doc(db, 'quizzes', id));
    fetchQuizzes();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Manage Quizzes</h1>
      <form onSubmit={handleSubmit} className="mb-8 border p-6 rounded">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {questions.map((q, idx) => (
          <div key={idx} className="mb-6 border p-4 rounded bg-gray-50">
            <input
              type="text"
              placeholder={`Question ${idx + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(idx, 'question', e.target.value)}
              className="border p-2 rounded w-full mb-2"
              required
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleQuestionChange(idx, `option${i}`, e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Correct Answer"
              value={q.answer}
              onChange={(e) => handleQuestionChange(idx, 'answer', e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
            <button
              type="button"
              onClick={() => removeQuestion(idx)}
              className="mt-2 text-red-600 hover:underline"
            >
              Remove Question
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Save Quiz
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Existing Quizzes</h2>
      <ul className="space-y-3">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <span>{quiz.title}</span>
            <button
              onClick={() => deleteQuiz(quiz.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
