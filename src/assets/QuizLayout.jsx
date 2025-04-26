import React, { useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import Score from "./Score";

const QuizLayout = () => {
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest mammal?",
      options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
      correctAnswer: "Blue Whale",
    },
    {
      id: 4,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
      correctAnswer: "Oxygen",
    },
    {
      id: 5,
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent van Gogh",
        "Pablo Picasso",
        "Leonardo da Vinci",
        "Michelangelo",
      ],
      correctAnswer: "Leonardo da Vinci",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleSelectOption = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleButtonClick = () => {
    if (!isAnswered) {
      const correct =
        selectedOption === questions[currentQuestionIndex].correctAnswer;
      setIsCorrect(correct);
      setIsAnswered(true);
      setAnswers([
        ...answers,
        {
          question: questions[currentQuestionIndex].question,
          answer: selectedOption,
          correctAnswer: questions[currentQuestionIndex].correctAnswer,
          isCorrect: correct,
        },
      ]);
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setIsCorrect(null);
      } else {
        setShowResults(true);
      }
    }
  };

  if (showResults) {
    const score = answers.filter((ans) => ans.isCorrect).length;
    return (
      <Score
        score={score}
        totalQuestions={questions.length}
        answers={answers}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-xl">
      <div className="flex">
        <div className="w-3/4">
          <h1 className="text-3xl font-bold text-black-800 mb-4 text-left">
            Quiz Challenge
          </h1>
          <h1 className="text-gray-500 font-semibold dark mb-4 text-left">
            Test your knowledge with these questions
          </h1>
        </div>
        <div className="w-1/4 bg-gray-200 rounded-full h-8 text-center font-semibold p-1">
          Question {currentQuestionIndex + 1}/5
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-black h-2.5 rounded-full"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {currentQuestion.questions}
      </h2>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          return (
            <div>
              <button
                key={index}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left px-4 py-3 border rounded-lg transition flex justify-between items-center 
              ${
                isAnswered && option === currentQuestion.correctAnswer
                  ? "bg-green-200"
                  : ""
              }
              ${
                isAnswered && option === selectedOption && !isCorrect
                  ? "bg-red-200"
                  : ""
              }
              ${
                !isAnswered
                  ? "bg-gray-100 border-gray-300 hover:bg-gray-200"
                  : "cursor-not-allowed"
              }`}
                disabled={isAnswered}
              >
                {option}
                {isAnswered && option === selectedOption && !isCorrect && (
                  <AiOutlineClose />
                )}
                {isAnswered && option === currentQuestion.correctAnswer && (
                  <AiOutlineCheck />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-left mt-4">
        <button
          onClick={handleButtonClick}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            selectedOption === null
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white"
          }`}
          disabled={selectedOption === null}
        >
          {currentQuestionIndex === questions.length - 1 && isAnswered
            ? "Show Results"
            : isAnswered
            ? "Next Question"
            : "Check Answer"}{" "}
          <BiArrowFromLeft />
        </button>
      </div>
    </div>
  );
};

export default QuizLayout;
