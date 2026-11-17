const STORAGE_KEY = "fitness-os-state";

export function loadState(fallback = {}) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.warn("Không thể đọc dữ liệu đã lưu:", error);
    return fallback;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn("Không thể lưu dữ liệu:", error);
    return false;
  }
}
