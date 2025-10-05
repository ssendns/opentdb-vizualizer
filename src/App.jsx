import { useApi } from "./hooks/useApi";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";
import { decodeHTML } from "./utils/decodeHTML";

function App() {
  const { questions, loading } = useApi();

  if (loading) return <div className="p-6 text-lg">loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">open trivia visualizer</h1>
      <CategoryChart questions={questions} />
      <DifficultyChart questions={questions} />

      <ul className="list-disc ml-5">
        {questions.map((q, i) => (
          <li key={i}>
            <strong>{decodeHTML(q.category)}</strong> — {q.difficulty} —{" "}
            {decodeHTML(q.question)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
