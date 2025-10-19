import { useState } from "react";

export default function Habits({ state, onAdd, onDelete }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100">Habits</h2>

      <form
  className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
  onSubmit={(e) => {
    e.preventDefault();
    if (!name) return;
    onAdd(name, goal);
    setName("");
    setGoal("");
  }}
>
  <input
    className="w-44 border border-gray-700 bg-gray-900 rounded-lg px-2 py-1 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Habit (e.g., Study)"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <input
    className="w-24 border border-gray-700 bg-gray-900 rounded-lg px-2 py-1 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Goal"
    value={goal}
    onChange={(e) => setGoal(e.target.value)}
  />
  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition">
    Add
  </button>
</form>


     <ul className="space-y-4 flex flex-col items-center">
  {state.habits.map((h) => (
    <li
      key={h.id}
      className="w-full sm:w-96 border border-gray-700 bg-gray-900 rounded-xl px-5 py-3 flex justify-between items-center shadow-sm hover:shadow-md transition"
    >
      <div>
        <div className="font-semibold text-gray-100">{h.name}</div>
        <div className="text-sm text-gray-400">
          Goal: {h.dailyGoal} min/day
        </div>
      </div>
      <button
        className="text-red-400 hover:text-red-500 text-sm transition"
        onClick={() => onDelete(h.id)}
      >
        Delete
      </button>
    </li>
  ))}
</ul>


    </div>
  );
}
