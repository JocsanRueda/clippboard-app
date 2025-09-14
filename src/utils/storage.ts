/* eslint-disable no-undef */

/**
 * Saves an item to localStorage.
 * @param key - The key under which the item will be saved.
 * @param value - The value to be saved (can be any data type).
 */
export function saveToLocalStorage(key: string, value: string): void {
  try {
    const serializedValue = JSON.stringify(value); // Serialize the value
    localStorage.setItem(key, serializedValue); // Save to localStorage
  } catch (error) {
    console.error(`Error saving to localStorage with key "${key}":`, error);
  }
}

/**
 * Retrieves an item from localStorage.
 * @param key - The key of the item to retrieve.
 * @returns The deserialized value or `null` if it doesn't exist.
 */
export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key); // Retrieve the value
    if (serializedValue === null) {
      return null; // Return null if it doesn't exist
    }
    return JSON.parse(serializedValue) as T; // Deserialize and return the value
  } catch (error) {
    console.error(`Error retrieving from localStorage with key "${key}":`, error);
    return null;
  }
}

/**
 * Removes an item from localStorage.
 * @param key - The key of the item to remove.
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key); // Remove the item
  } catch (error) {
    console.error(`Error removing from localStorage with key "${key}":`, error);
  }
}

/**
 * Clears all items from localStorage.
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear(); // Clear all localStorage
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
