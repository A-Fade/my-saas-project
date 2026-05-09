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
      className={`${color} p-6 rounded-[2rem] shadow-lg cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/10`}
    >
      {/* ✅ Heading color fixed to White (80% opacity for premium look) */}
      <p className="text-white/80 text-xs font-black uppercase tracking-widest">
        {title}
      </p>
      
      {/* ✅ Value color fixed to full White */}
      <h2 className="text-3xl font-black mt-2 text-white tracking-tight">
        {value}
      </h2>

      {/* Optional: Chhota indicator arrow */}
      {link && (
        <div className="mt-4 flex justify-end">
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded-lg font-bold">
            VIEW DETAILS →
          </span>
        </div>
      )}
    </div>
  );
}
