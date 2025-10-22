export default function History({ history }) {
  const today = new Date();
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toLocaleDateString();
  }).reverse();

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
        Last 7 Days
      </h2>

      <div className="grid grid-cols-7 gap-2">
        {last7Days.map((date, i) => {
          const totalForDay = Object.values(history || {}).reduce((sum, habitDays) => {
            return sum + (habitDays[date] || 0);
          }, 0);

          const color =
            totalForDay === 0
              ? "bg-slate-700/40"
              : totalForDay < 15
              ? "bg-emerald-600/40"
              : totalForDay < 60
              ? "bg-emerald-500/70"
              : "bg-emerald-400";

          return (
            <div
              key={i}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm text-white shadow-md ${color}`}
            >
              {totalForDay > 0 ? totalForDay : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
