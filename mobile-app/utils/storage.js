import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const STORAGE_KEY = '@trigger_tracker_entries';

/**
 * Generate a simple UUID v4
 */
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get all entries from storage
 */
export async function getAllEntries() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading entries:', e);
    return [];
  }
}

/**
 * Save a new entry
 */
export async function saveEntry(entry) {
  try {
    const entries = await getAllEntries();
    const newEntry = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      ...entry,
    };
    entries.push(newEntry);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  } catch (e) {
    console.error('Error saving entry:', e);
    throw e;
  }
}

/**
 * Update an existing entry
 */
export async function updateEntry(id, updates) {
  try {
    const entries = await getAllEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Entry not found');
    
    entries[index] = { ...entries[index], ...updates };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return entries[index];
  } catch (e) {
    console.error('Error updating entry:', e);
    throw e;
  }
}

/**
 * Delete an entry
 */
export async function deleteEntry(id) {
  try {
    const entries = await getAllEntries();
    const filtered = entries.filter(e => e.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Error deleting entry:', e);
    return false;
  }
}

/**
 * Get entries filtered by date range
 */
export async function getEntriesByDateRange(startDate, endDate) {
  const entries = await getAllEntries();
  return entries.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    return entryDate >= startDate && entryDate <= endDate;
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Export all data to JSON file
 */
export async function exportData() {
  try {
    const entries = await getAllEntries();
    const jsonString = JSON.stringify(entries, null, 2);
    const fileUri = FileSystem.documentDirectory + `trigger-tracker-backup-${Date.now()}.json`;
    await FileSystem.writeAsStringAsync(fileUri, jsonString);
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    }
    
    return fileUri;
  } catch (e) {
    console.error('Error exporting data:', e);
    throw e;
  }
}

/**
 * Import data from JSON string
 */
export async function importData(jsonString, merge = false) {
  try {
    const importedEntries = JSON.parse(jsonString);
    
    if (!Array.isArray(importedEntries)) {
      throw new Error('Invalid data format');
    }
    
    let finalEntries = importedEntries;
    
    if (merge) {
      const existingEntries = await getAllEntries();
      const entryMap = new Map();
      [...existingEntries, ...importedEntries].forEach(entry => {
        entryMap.set(entry.id, entry);
      });
      finalEntries = Array.from(entryMap.values());
    }
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(finalEntries));
    return finalEntries.length;
  } catch (e) {
    console.error('Error importing data:', e);
    throw e;
  }
}

/**
 * Clear all entries
 */
export async function clearAllEntries() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Error clearing entries:', e);
    return false;
  }
}
