import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAllEntries,
  saveEntry,
  updateEntry,
  deleteEntry,
  clearAllEntries,
} from '../utils/storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock FileSystem and Sharing
jest.mock('expo-file-system', () => ({}));
jest.mock('expo-sharing', () => ({}));

describe('Storage Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllEntries', () => {
    it('should return empty array when no data exists', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);
      const entries = await getAllEntries();
      expect(entries).toEqual([]);
    });

    it('should return parsed entries when data exists', async () => {
      const mockEntries = [
        { id: '1', score: 5, timestamp: '2025-10-16T12:00:00Z' },
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockEntries));
      
      const entries = await getAllEntries();
      expect(entries).toEqual(mockEntries);
    });
  });

  describe('saveEntry', () => {
    it('should add a new entry with id and timestamp', async () => {
      AsyncStorage.getItem.mockResolvedValue('[]');
      
      const entry = {
        score: 7,
        feelings: { before: 'anxious', during: 'numb', after: 'guilty' },
        surroundings: ['home'],
        notes: 'Test note',
      };

      const savedEntry = await saveEntry(entry);

      expect(savedEntry).toHaveProperty('id');
      expect(savedEntry).toHaveProperty('timestamp');
      expect(savedEntry.score).toBe(7);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('updateEntry', () => {
    it('should update an existing entry', async () => {
      const existingEntries = [
        { id: '123', score: 5, timestamp: '2025-10-16T12:00:00Z' },
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingEntries));

      const updated = await updateEntry('123', { score: 8 });

      expect(updated.score).toBe(8);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it('should throw error if entry not found', async () => {
      AsyncStorage.getItem.mockResolvedValue('[]');

      await expect(updateEntry('nonexistent', { score: 8 }))
        .rejects
        .toThrow('Entry not found');
    });
  });

  describe('deleteEntry', () => {
    it('should remove an entry', async () => {
      const existingEntries = [
        { id: '123', score: 5 },
        { id: '456', score: 7 },
      ];
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify(existingEntries));

      const result = await deleteEntry('123');

      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      
      const savedData = JSON.parse(AsyncStorage.setItem.mock.calls[0][1]);
      expect(savedData).toHaveLength(1);
      expect(savedData[0].id).toBe('456');
    });
  });

  describe('clearAllEntries', () => {
    it('should remove all entries', async () => {
      await clearAllEntries();
      expect(AsyncStorage.removeItem).toHaveBeenCalled();
    });
  });
});
