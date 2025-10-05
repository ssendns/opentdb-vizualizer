import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DifficultyChart({ questions }) {
  const difficultyCounts = questions.reduce((acc, q) => {
    const diff = q.difficulty;
    acc[diff] = (acc[diff] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(difficultyCounts).map(([difficulty, count]) => ({
    difficulty,
    count,
  }));

  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-2 text-center">
        questions per difficulty
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="difficulty" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
