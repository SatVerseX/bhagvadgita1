// Quiz taking page 
'use client';

import { useState, useEffect } from 'react';
import { Award, RotateCcw, CheckCircle, XCircle, Lightbulb, ChevronsRight, Loader2, AlertTriangle } from 'lucide-react'; // Fun icons
import { db } from '@/firebase/firebaseClient'; // Your Firebase config
import { collection, getDocs, query, limit, orderBy, startAt, getCountFromServer } from 'firebase/firestore';

interface QuizQuestion {
  id?: string; // Optional if IDs are implicit or managed by array index
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizSet {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

// Helper function to get day of the year (1-366)
const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export default function QuizPage() {
  const [quiz, setQuiz] = useState<QuizSet | null>(null);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [quizError, setQuizError] = useState<string | null>(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    async function fetchDailyQuiz() {
      setLoadingQuiz(true);
      setQuizError(null);
      try {
        const quizzesCollection = collection(db, 'quizzes');
        const snapshot = await getCountFromServer(quizzesCollection);
        const totalQuizzes = snapshot.data().count;

        if (totalQuizzes === 0) {
          setQuizError("Oh no! It seems we don't have any quizzes loaded yet. 🧸 Please check back later!");
          setLoadingQuiz(false);
          return;
        }

        const dayOfYear = getDayOfYear();
        const quizIndex = (dayOfYear - 1) % totalQuizzes; // 0-indexed
        
        // Fetch the specific quiz. Firestore doesn't directly support fetching by numerical index easily without ordering by a field.
        // A common pattern is to order by an ID or a creation date and use limit/startAt.
        // For simplicity here, if your quiz IDs are like 'quiz_001', 'quiz_002', we can try to construct an ID.
        // Or, more robustly, fetch all and pick. For larger sets, pagination/specific queries are better.
        
        // Simplistic approach: fetch all and pick. Not ideal for very large collections.
        const q = query(collection(db, "quizzes"), orderBy("title"), limit(1), startAt(quizIndex === 0 ? "" : null)); // This logic needs refinement based on how you want to pick daily
        // A better way if you have many quizzes: give quizzes a sequential 'order' field and query based on that.
        
        // For this example, let's assume we fetch all and pick one client-side for simplicity, 
        // though this is NOT recommended for a large number of quizzes due to read costs.
        // A better approach: Cloud Function to mark a "quiz of the day".
        const querySnapshot = await getDocs(quizzesCollection);
        if (querySnapshot.empty) {
          setQuizError("No quizzes found in the database. 🤔");
          setLoadingQuiz(false);
          return;
        }
        const allQuizzes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QuizSet));
        const dailyQuiz = allQuizzes[quizIndex % allQuizzes.length]; // Ensure we loop back if dayOfYear > totalQuizzes

        setQuiz(dailyQuiz);

      } catch (error) {
        console.error("Error fetching daily quiz:", error);
        setQuizError("Could not load today's quiz fun! 🐿️ Please try again later.");
      }
      setLoadingQuiz(false);
    }

    fetchDailyQuiz();
  }, []);

  const currentQuestionData = quiz?.questions[currentQ];

  function handleAnswer(option: string) {
    if (showExplanation || !currentQuestionData) return;

    setSelectedOption(option);
    const correct = option === currentQuestionData.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
    }
    setShowExplanation(true);
  }

  function handleNextQuestion() {
    setShowExplanation(false);
    setSelectedOption(null);
    setIsCorrect(null);
    if (quiz && currentQ + 1 < quiz.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  }

  function restartQuiz() {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    // Optionally, re-fetch a quiz if you want a *new* one on restart, or stick to the current daily one.
  }
  
  // Playful background colors for options
  const optionColors = [
    'bg-yellow-300 hover:bg-yellow-400',
    'bg-pink-300 hover:bg-pink-400',
    'bg-green-300 hover:bg-green-400',
    'bg-blue-300 hover:bg-blue-400',
  ];

  if (loadingQuiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-purple-100 p-6 text-center">
        <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-6" />
        <h1 className="text-2xl font-semibold text-gray-700">Loading Today's Quiz Adventure...</h1>
        <p className="text-gray-500">Getting the fun ready! 🎈</p>
      </div>
    );
  }

  if (quizError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6" />
        <h1 className="text-2xl font-semibold text-gray-700">Oopsie! Quiz Trouble!</h1>
        <p className="text-gray-600 mb-4">{quizError}</p>
        <button
          onClick={() => window.location.reload()} // Simple reload to try again
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white text-md font-semibold rounded-lg shadow-md hover:from-orange-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    );
  }

  if (!quiz || !currentQuestionData) {
    // This case should ideally be handled by quizError or loading state
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
         <h1 className="text-2xl font-semibold text-gray-700">No Quiz Data!</h1>
         <p className="text-gray-500">Something went wrong, and we couldn't load the quiz questions.</p>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 via-yellow-200 to-orange-200 p-6 text-center">
        <Award className="w-24 h-24 text-yellow-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-gray-700 mb-4">Awesome! You did it!</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Your Score: <span className="font-bold text-green-600">{score}</span> / {quiz.questions.length}
        </p>
        <button
          onClick={restartQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-orange-500 hover:to-red-600 transform hover:scale-105 transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again!
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-purple-200 to-pink-200 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all hover:shadow-purple-300/50 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-purple-600">{quiz.title}</h1>
          <div className="text-lg font-semibold text-gray-700 bg-yellow-200 px-4 py-1.5 rounded-lg shadow-sm">
            Question: {currentQ + 1} / {quiz.questions.length}
          </div>
        </div>

        <div className="bg-purple-50 p-5 rounded-xl shadow-inner mb-6 min-h-[100px] flex items-center justify-center">
          <p className="text-xl sm:text-2xl font-semibold text-gray-700 text-center">
            {currentQuestionData.questionText} 
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {currentQuestionData.options.map((opt, index) => {
            let buttonClass = `${optionColors[index % optionColors.length]} text-gray-700 font-semibold p-4 rounded-xl shadow-md transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2`;
            if (selectedOption === opt) {
              buttonClass += isCorrect ? ' ring-4 ring-green-500 scale-105' : ' ring-4 ring-red-500 scale-105';
            } else if (selectedOption && opt === currentQuestionData.correctAnswer) {
              buttonClass += ' ring-4 ring-green-500';
            }
            return (
              <button
                key={opt} // Consider using a more stable key if options can repeat across questions
                onClick={() => handleAnswer(opt)}
                disabled={showExplanation}
                className={`${buttonClass} ${selectedOption && opt !== selectedOption ? 'opacity-70' : ''}`}
              >
                {selectedOption === opt && (
                  isCorrect ? <CheckCircle className="inline mr-2 -mt-1 w-5 h-5 text-green-700" /> : <XCircle className="inline mr-2 -mt-1 w-5 h-5 text-red-700" />
                )}
                {opt}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`p-4 rounded-lg mt-6 text-center shadow ${isCorrect ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'} border`}>
            {isCorrect ? (
              <p className="text-lg font-semibold text-green-700"><Lightbulb className="inline mr-2 w-5 h-5" /> Awesome! That's correct! 🎉</p>
            ) : (
              <p className="text-lg font-semibold text-red-700"><Lightbulb className="inline mr-2 w-5 h-5" /> Not quite! The correct answer is: <span className="font-bold">{currentQuestionData.correctAnswer}</span></p>
            )}
            {currentQuestionData.explanation && (
              <p className="text-sm text-gray-600 mt-2 italic">{currentQuestionData.explanation}</p>
            )}
            <button
              onClick={handleNextQuestion}
              className="mt-4 flex items-center gap-2 mx-auto px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
            >
              Next Question <ChevronsRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
       <p className="mt-8 text-center text-purple-700 text-sm font-medium">
        Enjoy this journey of knowledge! 🚀
      </p>
    </div>
  );
}
