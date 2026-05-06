"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1 May", value: 20000 },
  { name: "7 May", value: 40000 },
  { name: "14 May", value: 30000 },
  { name: "21 May", value: 60000 },
  { name: "28 May", value: 80000 },
];

export default function Chart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow h-[300px]">

      <h2 className="mb-4 font-semibold">Payments Overview</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}