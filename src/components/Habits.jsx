import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Habits({ state, onAdd, onDelete, onAddMinutes, getProgress }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [timers, setTimers] = useState({});

  // ⏱ Update every second + detect finish
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          const t = updated[id];
          if (t.isRunning) {
            const elapsedSec = Math.floor((Date.now() - t.startTime) / 1000);
            const newMinutes = Math.floor(elapsedSec / 60) - t.logged;

            if (newMinutes >= 1) {
              onAddMinutes(id, newMinutes);
              updated[id].logged += newMinutes;
            }

            updated[id].elapsed = elapsedSec;

            // 🎯 Goal Completion Check
            const habit = state.habits.find((h) => h.id === id);
            if (habit && getProgress(id) >= habit.dailyGoal) {
              updated[id].isRunning = false;
              updated[id].completed = true;
            }
          }
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onAddMinutes, state.habits, getProgress]);

  const startTimer = (id) => {
    setTimers((prev) => ({
      ...prev,
      [id]: { isRunning: true, startTime: Date.now(), elapsed: 0, logged: 0, completed: false },
    }));
  };

  const stopTimer = (id) => {
    const t = timers[id];
    if (!t || !t.isRunning) return;
    const totalMin = Math.floor(t.elapsed / 60);
    onAddMinutes(id, totalMin - t.logged);
    setTimers((prev) => ({
      ...prev,
      [id]: { isRunning: false, startTime: null, elapsed: 0, logged: 0, completed: false },
    }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-6 text-gray-100 tracking-wide"
      >
        Your Habits
      </motion.h2>

      {/* 🧠 Add Habit Form */}
<form
  className="flex flex-col items-center justify-center gap-5 mb-10"
  onSubmit={(e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, goal);
    setName("");
    setGoal("");
  }}
>
  <input
    className="w-64 border border-gray-600 bg-white rounded-full px-4 py-3 text-base text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    placeholder="Habit name..."
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    className="w-64 border border-gray-600 bg-white rounded-full px-4 py-3 text-base text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    placeholder="Goal (min)"
    value={goal}
    onChange={(e) => setGoal(e.target.value)}
  />

  <button
    className="mt-3 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold rounded-full shadow hover:scale-105 active:scale-95 transition-transform"
  >
    Add
  </button>
</form>


      {/* 🧩 Habit List */}
      <ul className="space-y-5 flex flex-col items-center">
        {state.habits.map((h) => {
          const t = timers[h.id] || { isRunning: false, elapsed: 0, completed: false };
          const running = t.isRunning;
          const progress = getProgress(h.id);

          return (
            <motion.li
              key={h.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:w-[360px] rounded-2xl p-[1px] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 bg-[#0f172a]"
            >
              <div className="bg-[#0f172a] rounded-2xl px-4 py-3 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-xl">{h.name}</h3>
                    <p className="text-base text-gray-300">Goal: {h.dailyGoal} min/day</p>
                  </div>
                  <button
                    className="text-white/70 hover:text-white text-lg transition"
                    onClick={() => onDelete(h.id)}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-gray-300">
                    <span className="text-cyan-300 font-medium">{progress}</span> / {h.dailyGoal} min
                  </div>

                  {running && (
                    <div className="text-xs text-green-400 font-mono ml-2">
                      ⏱ {formatTime(t.elapsed)}
                    </div>
                  )}

                  <div className="flex gap-2 ml-auto">
                    {running ? (
                      <button
                        onClick={() => stopTimer(h.id)}
                        className="text-white bg-red-500 rounded-lg text-xs px-3 py-1"
                      >
                        Stop
                      </button>
                    ) : (
                      <button
                        onClick={() => startTimer(h.id)}
                        className="text-white bg-green-500 rounded-lg text-xs px-3 py-1"
                      >
                        Start
                      </button>
                    )}
                  </div>
                </div>

                {/* 🎉 Finish Message */}
                {t.completed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-sm mt-3 font-medium italic text-center"
                  >
                    🎉 Goal Completed!
                  </motion.p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
