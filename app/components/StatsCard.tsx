"use client";

import { useRouter } from "next/navigation";

export default function StatsCard({
  title,
  value,
  color,
  link,
}: {
  title: string;
  value: any;
  color: string;
  link?: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => link && router.push(link)}
      className={`${color} p-5 rounded-2xl shadow cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <p className="text-gray-700">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
}