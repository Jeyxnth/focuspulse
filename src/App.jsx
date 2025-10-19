import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { loadState, saveState } from "./lib/storage";
import Habits from "./components/Habits";

export default function App() {
  const [state, setState] = useState(loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addHabit = (name, dailyGoal) => {
    setState((s) => ({
      ...s,
      habits: [
        ...s.habits,
        { id: uuid(), name, dailyGoal: Number(dailyGoal) || 0 },
      ],
    }));
  };

  const deleteHabit = (id) => {
    setState((s) => ({
      ...s,
      habits: s.habits.filter((h) => h.id !== id),
    }));
  };

 return (
  <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 text-gray-100 p-6">
    <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-2xl p-8 mt-10">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
        FocusPulse
      </h1>

      <p className="text-gray-400 text-center italic mb-8">
        “Stay focused. Stay consistent. Build your habits.”
      </p>

      <Habits state={state} onAdd={addHabit} onDelete={deleteHabit} />
    </div>
  </div>
);


}
