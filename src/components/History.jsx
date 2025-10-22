import { motion } from "framer-motion";

export default function History({ history }) {
  // `history` = { habitId: { "2025-10-19": minutes, "2025-10-20": minutes, ... } }

  const days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-8 shadow-lg text-gray-100 w-[90%] max-w-3xl mx-auto border border-white/10"
    >
      <h2 className="text-xl font-semibold mb-6">Last 7 Days</h2>
      <div className="flex gap-3 justify-center">
        {days.map((d) => {
          const total = Object.values(history).reduce((sum, h) => sum + (h[d] || 0), 0);
          const intensity = Math.min(total / 60, 1); // color scale
          return (
            <div
              key={d}
              title={`${d}: ${total} min`}
              className={`w-10 h-10 rounded-lg transition-all ${
                total === 0
                  ? "bg-gray-700"
                  : `bg-cyan-500/[${
                      0.3 + intensity * 0.7
                    }] hover:bg-cyan-400/80`
              }`}
            ></div>
          );
        })}
      </div>
    </motion.div>
  );
}
