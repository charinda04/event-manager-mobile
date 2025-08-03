# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native mobile application called "event-manager-mobile" built with TypeScript. The app is a comprehensive event management system that allows users to create, discover, and manage events with authentication, real-time updates, and cross-platform support.

## Development Commands

- `npm start` or `npx expo start` - Start the Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator  
- `npm run web` - Start web version
- `npm run lint` - Run ESLint code linting
- `npm run reset-project` - Reset to blank project (removes starter code)

## Architecture

### File-based Routing
The app uses expo-router with file-based routing in the `app/` directory:
- `app/_layout.tsx` - Root layout with QueryClient, AuthProvider, and theme provider
- `app/(auth)/` - Authentication screens (login, register)
- `app/(tabs)/` - Main app tabs (events, my-events, create, profile)
- `app/+not-found.tsx` - 404 error screen

### Key Directories
- `app/` - Main application screens and layouts (file-based routing)
- `components/` - Reusable React components including themed components and UI elements
- `components/ui/` - Platform-specific UI components (iOS/default variants)
- `hooks/` - Custom React hooks for API calls, color scheme, and theming
- `services/` - API service layers for auth, events, etc.
- `contexts/` - React contexts for global state (AuthContext)
- `lib/` - Core utilities (API client, query client)
- `types/` - TypeScript type definitions
- `constants/` - App constants including color definitions
- `assets/` - Static assets (fonts, images, icons)

### State Management
- **TanStack Query (React Query)**: Server state management, caching, and synchronization
- **React Context**: Global client state (authentication)
- **Local State**: Component-level state with useState/useReducer

### Authentication System
- JWT-based authentication with refresh tokens
- Secure token storage using Expo SecureStore
- Protected routes with automatic redirection
- AuthContext provides global auth state and methods

### API Architecture
- Centralized API client with automatic token injection
- Service layer pattern for different domains (auth, events)
- Type-safe API responses with TypeScript interfaces
- Error handling and retry logic

### Data Models
Core entities:
- **User**: Authentication and profile data
- **Event**: Event details, location, attendees
- **EventLocation**: Geographic and address information
- **EventAttendee**: User-event relationships with status
- **Invitation**: Event invitation system
- **Notification**: In-app notifications

### Navigation Structure
- Authentication flow: Login/Register screens
- Main app: Tab-based navigation with 4 main sections:
  - Events: Browse all events
  - My Events: User's created events
  - Create: Event creation form
  - Profile: User profile and settings

### Theming System
The app implements a comprehensive theming system with:
- Light/dark theme support via `useColorScheme` hook
- Platform-specific styling (iOS blur effects, adaptive icons)
- Themed components (`ThemedText`, `ThemedView`) that automatically adapt to color scheme
- Color constants defined in `constants/Colors.ts`

### Path Aliases
TypeScript is configured with `@/*` path alias pointing to the root directory for cleaner imports.

## Platform Considerations
- iOS: Uses blur effects and transparent tab bars
- Android: Adaptive icons and edge-to-edge display enabled
- Web: Static output with Metro bundler
- New Architecture enabled for React Native

## Dependencies
- **@tanstack/react-query**: Server state management
- **expo-secure-store**: Secure token storage
- **expo-router**: File-based routing
- **React Native**: Core mobile framework

## Development Guidelines

### API Integration
- Set `EXPO_PUBLIC_API_URL` environment variable for API endpoint
- All API calls go through the centralized `apiClient`
- Use React Query hooks (`useEvents`, `useCreateEvent`, etc.) for data fetching
- Handle loading states and error states in components

### Authentication Flow
- Users must be authenticated to access main app
- Automatic redirection to login if not authenticated
- Token refresh handled automatically
- Logout clears all stored data

### Event Management
- Events have organizers, attendees, and locations
- Support for public/private events
- RSVP system with status tracking
- Real-time updates via React Query cache invalidation

## TypeScript Configuration
Strict mode enabled with Expo's base TypeScript configuration. Typed routes experiment enabled for better routing type safety.