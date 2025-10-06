import { useState, useMemo } from "react";
import { decodeHTML } from "../utils/decodeHTML";

export default function QuestionCard({ questionObj }) {
  const { question, category, difficulty, correct_answer, incorrect_answers } =
    questionObj;
  const [selected, setSelected] = useState(null);
  const allAnswers = useMemo(() => {
    return [...incorrect_answers, correct_answer].sort(
      () => Math.random() - 0.5
    );
  }, [questionObj]);

  const handleAnswerClick = (ans) => {
    if (!selected) {
      setSelected(ans);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 w-full max-w-2xl mx-auto">
      <div className="mb-3 text-sm text-gray-500 flex justify-between">
        <span>{decodeHTML(category)}</span>
        <span
          className={`px-2 py-0.5 rounded text-xs font-semibold ${
            difficulty === "easy"
              ? "bg-green-100 text-green-700"
              : difficulty === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {difficulty}
        </span>
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {decodeHTML(question)}
      </h3>

      <ul className="space-y-2">
        {allAnswers.map((ans, i) => {
          const isCorrect = ans === correct_answer;
          const isSelected = selected === ans;

          let bg = "bg-gray-50 hover:bg-gray-100";
          if (selected) {
            if (isSelected && isCorrect) bg = "bg-green-100 border-green-400";
            if (isSelected && !isCorrect) bg = "bg-red-100 border-red-400";
            if (!isSelected && isCorrect) bg = "bg-green-50";
          }

          return (
            <li
              key={i}
              onClick={() => handleAnswerClick(ans)}
              className={`border rounded-md px-3 py-2 text-gray-700 transition cursor-pointer ${bg}`}
            >
              {decodeHTML(ans)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
