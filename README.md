# Event Management Web App

Tech stack:

- Next.js (App Router)
- Firebase Authentication (Google)
- Firebase Firestore
- Tailwind CSS

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Firebase project:

- Enable **Authentication -> Google** provider
- Create a **Firestore Database**

3. Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

4. Run the app:

```bash
npm run dev
```

Open: http://localhost:3000

## Firebase Firestore Structure

- `users/{uid}`
  - `uid`
  - `name`
  - `email`
  - `photoURL`
  - `createdAt`

- `events/{eventId}`
  - `title`
  - `description`
  - `userId`
  - `createdAt`

## Features Implemented

- Google login using Firebase Authentication
- Stores user profile in Firestore after login
- Create Event page (title + description) that saves to Firestore with `userId` + `createdAt`
- Events Listing page that shows only the logged-in user’s events
- Clean empty state when no events exist
- Tailwind-only minimal responsive UI
