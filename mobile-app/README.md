# Trigger Tracker Mobile App

A single-user mobile app to track triggers related to negative habits and behaviors. Simple, fast, and private — all data stored locally with export/import for backup.

## Features

- **Quick Entry**: Pick a score 1-10 (color-coded), record feelings (before/during/after), surroundings, and notes
- **History**: View, filter, edit, and delete past entries
- **Analytics**: Daily/weekly/monthly summaries, color range breakdown, and insights
- **Settings**: Export/import data as JSON, view color scale legend
- **Offline-first**: All data stored locally using AsyncStorage

## Color Mapping

- **1-3**: Green range (1 = dark green = best)
- **4-7**: Yellow range (moderate)
- **8-10**: Red range (10 = extremely red = worst)

## Tech Stack

- Expo SDK ~51
- React Native
- React Navigation (tabs + stack)
- AsyncStorage for local storage
- Victory Native for charts
- Jest + React Native Testing Library for tests

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo Go app on your phone (iOS/Android) OR an emulator

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

### Run Tests

```bash
npm test
```

## Project Structure

```
mobile-app/
├── screens/           # All app screens
│   ├── QuickEntryScreen.js
│   ├── HistoryScreen.js
│   ├── DetailScreen.js
│   ├── AnalyticsScreen.js
│   └── SettingsScreen.js
├── utils/             # Utilities
│   ├── colorMapping.js   # Color scale logic
│   └── storage.js        # AsyncStorage wrapper
├── __tests__/         # Jest tests
│   ├── colorMapping.test.js
│   └── storage.test.js
├── App.js             # Main navigation
└── package.json
```

## Data Model

Each entry:
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
  "surroundings": ["home", "alone"],
  "notes": "Optional notes"
}
```

## Backup & Export

- Go to **Settings** → **Export Data** to save a JSON backup
- Share the file to cloud storage (Google Drive, iCloud, etc.)
- To import: manually load the JSON (future feature)

## License

MIT License
