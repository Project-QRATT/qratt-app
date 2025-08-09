# QR Attendance App

A modern React Native application for QR-based attendance tracking, built with Expo Router and Supabase authentication.

## 🏗️ Architecture

This app follows clean architecture principles with a clear separation of concerns:

```
qrattendance-app/
├── app/                    # App Router screens
│   ├── (tabs)/            # Main app tabs
│   ├── auth/              # Authentication screens  
│   └── _layout.tsx        # Root layout with auth protection
├── components/            # Reusable UI components
├── providers/             # React Context providers
├── lib/                   # Utilities and configurations
├── hooks/                 # Custom React hooks
└── constants/             # App constants
```

## 🔐 Authentication Flow

The app implements a secure authentication system:

1. **AuthProvider** - Global auth state management
2. **ProtectedLayout** - Route protection based on auth status
3. **AuthForm** - Reusable form for sign-in/sign-up
4. **Supabase Integration** - Backend authentication service

### Authentication States

- **Loading**: Checking initial auth state
- **Authenticated**: User has valid session → Access to main app
- **Unauthenticated**: No valid session → Redirected to auth screens

## 📁 Key Files & Their Purpose

### Core App Structure

- **`app/_layout.tsx`** - Root layout with authentication protection
- **`app/auth/_layout.tsx`** - Authentication screens layout
- **`app/(tabs)/_layout.tsx`** - Main app tab navigation

### Authentication Components

- **`providers/AuthProvider.tsx`** - Global authentication state management
- **`components/AuthForm.tsx`** - Reusable authentication form
- **`app/auth/sign-in.tsx`** - Sign-in screen
- **`app/auth/sign-up.tsx`** - Sign-up screen

### Main App

- **`app/(tabs)/index.tsx`** - Home screen with user info and logout

### Configuration

- **`lib/supabase.ts`** - Supabase client configuration
- **`lib/utils.ts`** - Utility functions
- **`app.json`** - Expo configuration with splash screen

## 🎨 Design System

The app uses a consistent design system:

- **Colors**: Blue primary (#3B82F6), with dark mode support
- **Typography**: Clear hierarchy with proper font weights
- **Components**: Reusable, accessible components
- **Layout**: Consistent spacing and padding patterns

## 🔧 Best Practices Implemented

### Code Quality

1. **TypeScript**: Full type safety with proper interfaces
2. **Documentation**: Comprehensive JSDoc comments
3. **Error Handling**: Proper try-catch blocks and user feedback
4. **Accessibility**: ARIA labels and semantic elements

### React Patterns

1. **Custom Hooks**: `useAuth()` for authentication state
2. **Context Pattern**: AuthProvider for global state
3. **Component Composition**: Reusable, single-responsibility components
4. **Form Handling**: React Hook Form with Zod validation

### Performance

1. **Lazy Loading**: Screens loaded on demand
2. **Optimized Renders**: Proper dependency arrays
3. **Memory Management**: Cleanup functions for subscriptions
4. **Image Optimization**: Expo Image for better performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Supabase account

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file with your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

### Build for Production

- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`

## 🧪 Testing Authentication

### In Development (Expo Go)
- Use Expo Go app to scan QR code
- Note: Custom splash screen only visible in development builds

### In Production Build
```bash
# Create development build to see custom splash screen
npx expo run:android
# or
npx expo run:ios
```

## 📱 Features

### Current Features

- ✅ **User Authentication** (Sign up, Sign in, Sign out)
- ✅ **Route Protection** (Auth-based navigation)
- ✅ **Session Persistence** (Auto-login on app restart)
- ✅ **Dark Mode Support** (System-aware theming)
- ✅ **Form Validation** (Email and password validation)
- ✅ **Custom Splash Screen** (Brand-aligned design)

### Planned Features

- 🔄 **QR Code Generation** (For attendance events)
- 🔄 **QR Code Scanning** (For attendance tracking)
- 🔄 **Attendance History** (View past attendance records)
- 🔄 **User Profiles** (Extended user information)

## 🔧 Development Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run web version
- `npm run lint` - Run ESLint

## 📚 Dependencies

### Core Framework
- **React Native** - Mobile framework
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing

### Authentication & Backend
- **Supabase** - Backend as a service
- **AsyncStorage** - Local data persistence

### UI & Styling
- **NativeWind** - Utility-first styling
- **Expo Vector Icons** - Icon library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 🤝 Contributing

This codebase follows clean architecture principles. When contributing:

1. **Follow TypeScript patterns** - Use proper types and interfaces
2. **Add documentation** - Include JSDoc comments for functions
3. **Write accessible code** - Include proper ARIA labels
4. **Test authentication flows** - Ensure auth works in all states
5. **Maintain consistency** - Follow existing patterns and naming

## 📄 License

This project is private and proprietary.

---

**Clean, documented, and ready for QR attendance features! 🎉**