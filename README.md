# Event Management Web App

A modern, responsive event management application built with Next.js and Firebase. Users can create, view, and manage their personal events with secure Google authentication.

## Features

- **Secure Authentication**: Google OAuth integration with Firebase Authentication
- **Event Management**: Create and view personal events with title and description
- **Real-time Updates**: Live synchronization using Firestore real-time listeners
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **User Isolation**: Each user sees only their own events
- **Clean UI**: Minimal, modern interface with smooth interactions

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Firebase Authentication (Google Provider)
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+
- npm or yarn
- Google account (for authentication)
- Firebase project

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd event-management
npm install
```

### 2. Firebase Setup

1. Create a new project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → **Sign-in method** → **Google**
3. Create a **Firestore Database** in test or production mode
4. Get your Firebase configuration from Project Settings

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── events/           # Events listing page
│   ├── login/           # Authentication page
│   ├── layout.tsx       # Root layout with providers
│   ├── page.tsx         # Create event page (home)
│   └── globals.css      # Global styles
├── components/
│   ├── AuthProvider.tsx # Firebase authentication context
│   ├── RequireAuth.tsx  # Route protection wrapper
│   └── TopNav.tsx       # Navigation component
└── lib/
    ├── firebase.ts      # Firebase configuration
    └── dates.ts         # Date utility functions
```

## Database Schema

### Users Collection (`users/{uid}`)

```typescript
{
  uid: string;           // Firebase Auth UID
  name: string;          // User display name
  email: string;         // User email
  photoURL?: string;     // Profile picture URL
  createdAt: Timestamp;  // Account creation time
}
```

### Events Collection (`events/{eventId}`)

```typescript
{
  title: string; // Event title
  description: string; // Event description
  userId: string; // Creator's UID (foreign key)
  createdAt: Timestamp; // Event creation time
}
```

## Security Features

- **Authentication Required**: All routes protected except login page
- **User Isolation**: Firestore security rules ensure users can only access their own events
- **Environment Variables**: Sensitive Firebase config stored in environment variables
- **Secure Redirects**: Proper URL validation for post-login redirects

## UI Components

- **Responsive Navigation**: Desktop and mobile-friendly navigation
- **Form Validation**: Client-side validation with error handling
- **Loading States**: Smooth loading indicators for better UX
- **Empty States**: Helpful messages when no events exist
- **Error Handling**: User-friendly error messages and recovery

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Getting Help

- Check the [Firebase Documentation](https://firebase.google.com/docs)
- Review the [Next.js Documentation](https://nextjs.org/docs)
- Open an issue on GitHub for specific problems

## 🔄 Future Enhancements

- [ ] Event editing and deletion
- [ ] Event categories and tags
- [ ] Event dates and reminders
- [ ] User profile customization
- [ ] Event sharing capabilities
- [ ] Analytics dashboard
- [ ] Bulk operations
- [ ] Export functionality
