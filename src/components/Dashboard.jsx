export default function Dashboard({ habits }) {
  const today = new Date().toLocaleDateString();
  const totalHabits = habits.length;
  const completed = habits.filter((h) => h.progress >= h.dailyGoal).length;
  const totalMinutes = habits.reduce((sum, h) => sum + (h.progress || 0), 0);

  const quotes = [
    "Discipline beats motivation every time.",
    "Be stronger than your excuses.",
    "Small progress is still progress.",
    "Stay consistent, even on bad days.",
    "Dream big. Start small. Stay steady.",
  ];
  const quote = quotes[new Date().getSeconds() % quotes.length];

  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h2 className="text-3xl font-bold text-cyan-300 drop-shadow-md">
        Today’s Summary
      </h2>
      <p className="text-gray-400">{today}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
        {/* Total Habits Card */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-cyan-500/30 shadow-xl backdrop-blur-lg p-6 hover:scale-105 transition-all duration-300">
          <p className="text-4xl font-bold text-white">{totalHabits}</p>
          <p className="text-gray-300 text-sm mt-1">Total Habits</p>
        </div>

        {/* Completed Card */}
        <div className="rounded-3xl bg-gradient-to-br from-green-500/30 via-emerald-600/20 to-teal-500/30 shadow-xl backdrop-blur-lg p-6 hover:scale-105 transition-all duration-300">
          <p className="text-4xl font-bold text-white">{completed}</p>
          <p className="text-gray-300 text-sm mt-1">Completed</p>
        </div>

        {/* Total Minutes Card */}
        <div className="rounded-3xl bg-gradient-to-br from-purple-500/30 via-indigo-600/20 to-pink-500/30 shadow-xl backdrop-blur-lg p-6 hover:scale-105 transition-all duration-300">
          <p className="text-4xl font-bold text-white">{totalMinutes}</p>
          <p className="text-gray-300 text-sm mt-1">Total Minutes</p>
        </div>
      </div>

      <p className="italic text-gray-400 mt-6">“{quote}”</p>
    </div>
  );
}
