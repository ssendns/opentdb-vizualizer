import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { decodeHTML } from "../utils/decodeHTML";

const COLORS = [
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#10b981", // emerald
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f97316", // orange
  "#22c55e", // green
  "#0ea5e9", // sky
  "#eab308", // yellow
  "#6366f1", // indigo
  "#a855f7", // purple
  "#4ade80", // lime
  "#f43f5e", // rose
  "#38bdf8", // cyan
  "#fb923c", // warm orange
  "#84cc16", // lime-green
  "#e879f9", // fuchsia
  "#60a5fa", // light blue
  "#c084fc", // light violet
];

export default function CategoryChart({ questions }) {
  const categoryCounts = questions.reduce((acc, question) => {
    const cat = question.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(categoryCounts).map(([category, value]) => ({
    name: decodeHTML(category),
    value,
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        questions per category
      </h2>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              nameKey="name"
              label={({ name, value }) => {
                const total = data.reduce((sum, d) => sum + d.value, 0);
                const percent = (value / total) * 100;
                return percent >= 10 ? name : "";
              }}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
