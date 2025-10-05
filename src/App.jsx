import { useApi } from "./hooks/useApi";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";
import { decodeHTML } from "./utils/decodeHTML";

function App() {
  const { questions, loading } = useApi();

  if (loading) return <div className="p-6 text-lg">loading...</div>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">open trivia visualizer</h1>
          <p className="text-gray-600 mt-2">
            explore questions by category and difficulty
          </p>
        </header>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <CategoryChart questions={questions} />
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-6">
          <DifficultyChart questions={questions} />
        </section>

        <ul className="list-disc ml-5">
          {questions.map((q, i) => (
            <li key={i}>
              <strong>{decodeHTML(q.category)}</strong> — {q.difficulty} —{" "}
              {decodeHTML(q.question)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
