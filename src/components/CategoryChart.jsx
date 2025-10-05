import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { decodeHTML } from "../utils/decodeHTML";

const COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#22c55e",
  "#0ea5e9",
  "#eab308",
  "#6366f1",
  "#a855f7",
  "#4ade80",
  "#f43f5e",
  "#38bdf8",
  "#fb923c",
  "#84cc16",
  "#e879f9",
  "#60a5fa",
  "#c084fc",
];

function getLegendLabel(name) {
  if (name.startsWith("Entertainment: ")) {
    return name.replace("Entertainment: ", "");
  } else if (name.startsWith("Science: ")) {
    return name.replace("Science: ", "");
  }
  return name;
}

export default function CategoryChart({ questions }) {
  const categoryCounts = questions.reduce((acc, q) => {
    const cat = decodeHTML(q.category);
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="mt-8 px-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        questions per category
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-2/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => {
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full md:w-1/3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="truncate">{getLegendLabel(entry.name)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
