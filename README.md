# Trigger Tracker

Trigger Tracker (mobile) is a single-user mobile application to help you track triggers related to negative habits and behaviors. It's designed to be simple, fast, and private: no authentication, no remote server — all data is stored locally on your phone and can be exported for backup.

## What changed

- Single-user mobile app (you use it alone). No authentication required.
- Quick entry flow: pick a score 1–10 (mapped to green/yellow/red shades), record feelings (before, during, after), surroundings/tags and notes.
- Offline-first: data stored locally (AsyncStorage) with JSON export/import for backup/transfer.
- Simple analytics (daily/weekly/monthly summaries and a timeline).

## Features

- Fast quick-entry for every event (1–10 score with live color preview)
- Track feelings (before, during, after), surroundings, and notes
- History and detail view (edit/delete entries)
- Color mapping: 1–3 greens (lower = better), 4–7 yellows, 8–10 reds (10 = extremely red)
- Weekly chart showing entry frequency
- Export and import data as JSON for backup

## Technology Stack

- **Frontend**: Expo + React Native
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Local storage**: AsyncStorage for simplicity
- **Charts**: Victory Native for analytics
- **Testing**: Jest + React Native Testing Library

## Getting started

### Prerequisites

- Node.js 18+ and npm
- Expo Go app on your phone (iOS/Android) OR an emulator

### Installation & Running

1. Navigate to the mobile app directory:

```bash
cd mobile-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your device:
   - Scan the QR code with **Expo Go** (Android) or **Camera app** (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

### Run Tests

```bash
cd mobile-app
npm test
```

All tests should pass (17 tests covering color mapping and storage utilities).

## Quick design notes

### Data model for an entry

```json
{
  "id": "uuid-v4",
  "timestamp": "2025-10-16T12:34:56Z",
  "score": 8,
  "color": "#FF3B30",
  "feelings": { 
    "before": "anxious", 
    "during": "numb", 
    "after": "guilty" 
  },
  "surroundings": ["home","alone"],
  "notes": "Triggered after seeing social media"
}
```

### Color mapping

- **1**: Dark green (best, "none at all")
- **2**: Medium green
- **3**: Light green
- **4-7**: Yellow range (moderate)
- **8**: Deep orange
- **9**: Red
- **10**: Extremely red (worst)

The "green takes the last 3" rule is implemented as: scores 1-3 are in the green range (lower scores = better).

## Backup & export

- Open the app → go to **Settings** tab
- Tap **Export Data (JSON)** to save a backup file
- Share the file to your cloud storage (Google Drive, iCloud, Dropbox, etc.)
- To restore on a new device, manually load the JSON (import feature can be added in the future)

## App Screens

1. **Quick Entry**: Record a new event in ~3 taps (score + optional details + save)
2. **History**: Browse past entries with filters (all/today/week/month)
3. **Analytics**: View charts, color range breakdown, and insights
4. **Settings**: Export data, view color legend, clear all data

## Project Structure

```
mobile-app/
├── screens/              # All app screens
│   ├── QuickEntryScreen.js
│   ├── HistoryScreen.js
│   ├── DetailScreen.js
│   ├── AnalyticsScreen.js
│   └── SettingsScreen.js
├── utils/                # Utilities
│   ├── colorMapping.js   # Color scale logic (1-10 mapping)
│   └── storage.js        # AsyncStorage wrapper (CRUD + export/import)
├── __tests__/            # Jest unit tests
│   ├── colorMapping.test.js
│   └── storage.test.js
├── App.js                # Main navigation setup
├── package.json
└── README.md
```

## Next Steps / Future Enhancements

- Add import functionality in Settings (currently export-only)
- Add push notifications/reminders
- Add patterns detection (e.g., "You tend to score higher on weekends")
- Add more detailed analytics (trends over time, correlations)
- Add ability to track multiple habits/categories
- Optionally migrate to SQLite for better performance with large datasets

## Contributing

This is a personal single-user app. If you want to fork and customize, feel free! Pull requests are welcome!

## License

This project is licensed under the MIT License.

