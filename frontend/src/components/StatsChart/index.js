import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import "./index.css";

export function StatsChart({ itemPriceRange, monthName }) {
  let list = Object.keys(itemPriceRange);
  list = list.map((each) => ({
    name: each,
    items: itemPriceRange[each],
  }));

  return (
    <div className="chart-container">
      <h2>
        <u>Bar Charts Stats</u> - <i style={{ color: "green" }}>{monthName}</i>
      </h2>
      <ResponsiveContainer width="70%">
        <BarChart
          width="500"
          height="500"
          data={list}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis interval={1} tickCount={10} allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="items" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
