import { useApi } from "./hooks/useApi";

function App() {
  const { questions, loading } = useApi();

  if (loading) return <div className="p-6 text-lg">loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">open trivia visualizer</h1>

      <ul className="list-disc ml-5">
        {questions.map((q, i) => (
          <li key={i}>
            <strong>{q.category}</strong> — {q.difficulty} — {q.question}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
