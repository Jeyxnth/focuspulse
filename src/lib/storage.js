const KEY = "focuspulse_v2";

// Load saved data
export function loadState() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return { habits: [], logs: {} };
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

// Date key for today
export function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}
