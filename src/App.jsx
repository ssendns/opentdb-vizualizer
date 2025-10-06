import { useState, useMemo } from "react";
import { useApi } from "./hooks/useApi";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";
import QuestionCard from "./components/QuestionCard";

function App() {
  const { questions, loading } = useApi();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allCategories = useMemo(() => {
    const unique = new Set(questions.map((q) => q.category));
    return ["all", ...Array.from(unique)];
  }, [questions]);

  const filteredQuestions =
    selectedCategory === "all"
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  if (loading) return <div className="p-6 text-lg">loading...</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">questions visualizer</h1>
          <p className="text-gray-600 mt-2">
            reload the page to get a new set of questions
          </p>
        </header>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <CategoryChart questions={questions} />
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <DifficultyChart questions={questions} />
        </section>

        <hr className="border-t border-gray-300 my-10" />

        <header className="mb-5 text-center">
          <h1 className="text-4xl font-bold">all questions</h1>
          <p className="text-gray-600 mt-2">use filter to select a category</p>
        </header>

        <div className="mb-6 text-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-sm"
          >
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((q, i) => (
            <QuestionCard key={i} questionObj={q} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
