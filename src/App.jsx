import { useApi } from "./hooks/useApi";
import CategoryChart from "./components/CategoryChart";

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function App() {
  const { questions, loading } = useApi();

  if (loading) return <div className="p-6 text-lg">loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">open trivia visualizer</h1>
      <CategoryChart questions={questions} />

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
