// Local storage key
const KEY = "focuspulse_v1";

// Load saved data or start fresh
export function loadState() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { habits: [], logs: {} }; // start empty
  try {
    return JSON.parse(raw);
  } catch {
    return { habits: [], logs: {} };
  }
}

// Save data
export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// Get today's date key
export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}
