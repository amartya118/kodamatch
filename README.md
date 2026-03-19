# KodaMatch

KodaMatch is a React Native + Expo mobile app concept for iOS and Android focused on helping the Kodava community build trusted dating and matchmaking connections.

## Features

- Guided onboarding that explains the product and trust model.
- Multi-step verification flow covering basic details, `manne peda`, relationship intent, and consent.
- Discover tab with curated matches and compatibility notes.
- Inbox preview for conversations with verified members.
- Profile tab with verification progress and account controls.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npm run start
   ```

3. Open the app in:
   - iOS Simulator via `npm run ios`
   - Android Emulator via `npm run android`
   - Expo Go by scanning the QR code from the terminal

## Scripts

- `npm run start` — start the Expo dev server
- `npm run ios` — launch on iOS
- `npm run android` — launch on Android
- `npm run web` — open the web preview
- `npm run typecheck` — run TypeScript checks

## Assets

The repository intentionally does not include placeholder PNG app icons or splash screens so pull requests stay text-only and avoid binary-diff issues in code review tools. Add your real branding assets under `assets/` and then point `app.json` at them when you are ready to ship.
