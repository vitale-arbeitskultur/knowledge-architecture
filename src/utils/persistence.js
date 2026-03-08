const PREFIX = 'kma-'

export function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw !== null) {
      return JSON.parse(raw)
    }
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage`, e)
  }
  return fallback
}

export function saveData(key, data) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(data))
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage`, e)
  }
}
