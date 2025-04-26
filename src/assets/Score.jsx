import React from "react";
import { BiTrophy } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { RiRestartFill } from "react-icons/ri";

const Score = ({ score, totalQuestions, answers }) => {

  const percentage = (score / totalQuestions) * 100;
  const getMessage = () => {
    if (percentage === 100) return "Excellent work!";
    if (percentage >= 80) return "Great job!";
    if (percentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-xl text-center">
      <h1 className="text-3xl font-bold text-black mb-2">Quiz Results</h1>
      <h2 className="text-gray-500 font-semibold mb-4">Here's how you did</h2>
      <div className="text-green-500 text-4xl flex justify-center mb-2">
        <BiTrophy />
      </div>
      <h3 className="text-xl font-bold text-green-600">{getMessage()}</h3>
      <h2 className="text-3xl font-bold mt-2">
        {score} / {totalQuestions}
      </h2>
      <p className="text-gray-500">You scored {percentage}%</p>

      <div className="mt-6 text-left">
        <h3 className="text-lg font-semibold mb-2">Question Summary</h3>
        <div className="space-y-2">
          {answers.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold">{item.question}</p>
              <p
                className={`${
                  item.isCorrect ? "text-green-500" : "text-red-500"
                } font-semibold flex items-center`}
              >
                Your answer: {item.answer}{" "}
                {item.isCorrect && <AiOutlineCheck className="ml-1" />}
              </p>
              {!item.isCorrect && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Correct answer:</span>
                  <span className="text-green-500">{item.correctAnswer}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-black text-white rounded-lg flex items-center justify-center w-full"
      >
        <RiRestartFill className="mr-2" /> Try Again
      </button>
    </div>
  );
};

export default Score;
