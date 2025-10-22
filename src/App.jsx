import { useState } from "react";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import Habits from "./components/Habits";

export default function App() {
  const [state, setState] = useState({
    habits: [],
    history: {},
  });

  const [showDashboard, setShowDashboard] = useState(false);

  const addHabit = (name, goal) => {
    if (!name.trim() || !goal.trim()) return;
    const newHabit = {
      id: Date.now(),
      name,
      dailyGoal: parseInt(goal),
      progress: 0,
    };
    setState((prev) => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  };

  const deleteHabit = (id) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== id),
    }));
  };

  const addMinutes = (id, min) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === id ? { ...h, progress: (h.progress || 0) + min } : h
      ),
    }));
  };

  const getProgress = (id) => {
    const habit = state.habits.find((h) => h.id === id);
    return habit ? habit.progress : 0;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-xl font-semibold text-cyan-400 mb-4 mt-2 text-center">
        Build discipline. Track progress. Stay focused.
      </h1>

      {/* Dashboard Toggle Button */}
      <button
        onClick={() => setShowDashboard(!showDashboard)}
        className="mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform text-white font-medium shadow-lg"
      >
        {showDashboard ? "Hide Dashboard ▲" : "Show Dashboard ▼"}
      </button>

      {/* Dashboard Section — Hidden when collapsed */}
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          showDashboard
            ? "opacity-100 scale-100 translate-y-0 max-h-[700px] mb-10"
            : "opacity-0 scale-95 -translate-y-4 max-h-0 mb-0 overflow-hidden"
        }`}
      >
        {showDashboard && (
          <div className="p-6 bg-[#1e293b]/40 rounded-3xl shadow-lg backdrop-blur-md border border-white/10">
            <Dashboard habits={state.habits} />
            <div className="mt-8">
              <History history={state.history} />
            </div>
          </div>
        )}
      </div>

      {/* Habits Section */}
      <div className="w-full flex justify-center">
        <Habits
          state={state}
          onAdd={addHabit}
          onDelete={deleteHabit}
          onAddMinutes={addMinutes}
          getProgress={getProgress}
        />
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-400 text-sm pb-6">
  © 2025 <span className="font-semibold text-cyan-400">FocusPulse</span> • made by{" "}
  <span className="text-pink-400 font-semibold">g1anT 🚀</span>
</footer>

    </div>
  );
}
