import { useApi } from "./hooks/useApi";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";
import QuestionCard from "./components/QuestionCard";

function App() {
  const { questions, loading } = useApi();

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

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">all questions</h1>
          <p className="text-gray-600 mt-2">use filter to select a category</p>
        </header>

        <div className="space-y-6">
          {questions.map((q, i) => (
            <QuestionCard key={i} questionObj={q} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
