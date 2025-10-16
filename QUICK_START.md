# 🚀 Quick Start Guide - Trigger Tracker Mobile

## Step 1: Open Terminal and Navigate

```bash
cd "c:\Users\seelem\OneDrive - Botswana Telecommunications Company\Documents\SoftwareEngineering\Coding Projects\trigger-tracker\mobile-app"
```

## Step 2: Start the App

```bash
npm start
```

This will:
- Start the Expo development server
- Show a QR code in the terminal
- Open Metro Bundler in your browser

## Step 3: Run on Your Phone

### Option A: Use Expo Go (Recommended)

1. Download **Expo Go** from:
   - iOS: App Store
   - Android: Google Play Store

2. Open Expo Go on your phone

3. Scan the QR code:
   - **iOS**: Use the Camera app to scan the QR code
   - **Android**: Use Expo Go app to scan the QR code

4. The app will load on your phone!

### Option B: Use Emulator

In the terminal where `npm start` is running:
- Press `a` for Android emulator
- Press `i` for iOS simulator (Mac only)

## Step 4: Use the App

### Create Your First Entry

1. You'll land on the **Quick Entry** screen
2. Tap a number (1-10) to select severity
3. Fill in feelings (optional):
   - Before: e.g., "anxious"
   - During: e.g., "numb"
   - After: e.g., "guilty"
4. Add surroundings: e.g., "home, alone"
5. Add notes (optional)
6. Tap **Save Entry**

✅ Your first entry is saved!

### View Your History

1. Tap the **History** tab at the bottom
2. See all your entries sorted by date
3. Use filters: All / Today / Week / Month
4. Tap any entry to see details

### Check Analytics

1. Tap the **Analytics** tab
2. See:
   - Total entries count
   - Average score
   - Breakdown by color (green/yellow/red)
   - Weekly chart (last 7 days)

### Export Your Data

1. Tap the **Settings** tab
2. Tap **Export Data (JSON)**
3. Share the file to Google Drive, iCloud, or save locally

## Troubleshooting

### "Can't connect to development server"

1. Make sure your phone and computer are on the same WiFi network
2. Try restarting the Expo server: Press Ctrl+C, then run `npm start` again

### "Module not found" errors

1. Stop the server (Ctrl+C)
2. Run `npm install` again
3. Run `npm start`

### App crashes or won't load

1. Close Expo Go completely
2. Clear Expo Go cache (in app settings)
3. Scan the QR code again

## Tips

- **Quick entry**: The app is designed for speed. You can save an entry with just a score in 2 taps.
- **Backup regularly**: Export your data weekly to avoid losing entries.
- **Use filters**: In History, filter by "Today" to see just today's entries.
- **Edit entries**: Tap any entry in History → tap Edit to modify it.

## What the Colors Mean

- **Green (1-3)**: Good days, low severity
- **Yellow (4-7)**: Moderate severity
- **Red (8-10)**: Severe episodes

The lower the number, the better!

## Next Steps

1. Start tracking for a few days
2. Review your patterns in Analytics
3. Export your data for safekeeping
4. Keep tracking to understand your triggers better

---

**Need help?** Check the main README.md or PROJECT_SUMMARY.md files.
