# 💪 Workout Planner

A swipe-based, mobile-first workout app that functions like a dating app for exercises. Users swipe right to mark exercises as completed in an 8-week, 3-day-per-week full-body program.

## ✨ Features

- **Tinder-style swipe interface** - One card per exercise, swipe right to complete
- **Week/Day navigation** - Jump to any workout from the home screen
- **Progress tracking** - Visual progress indicators and completion states
- **Mobile-optimized** - Designed for one-handed use with large touch targets
- **PWA support** - Installable on mobile devices, works offline
- **Satisfying animations** - Smooth motion with Framer Motion

## 🚀 Quick Start (Windows)

### Prerequisites

- Node.js 18+ (tested with 20.11.1)
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser (or next available port)
```

### Building for Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

### Mobile Testing

```bash
# Find your local IP address
ipconfig

# Access http://[YOUR-IP]:5173 on mobile device (same WiFi network)
```

## 🏗️ Project Structure

```
src/
├── data/
│   └── program.ts          # Workout program data model
├── lib/
│   └── storage.ts          # LocalStorage utilities for progress
├── pages/
│   ├── Home.tsx           # Week/Day selection screen
│   └── Workout.tsx        # Main swipe workout interface
├── components/
│   └── ExerciseCard.tsx   # Swipeable exercise card component
└── index.css              # Tailwind CSS styles
```

## 📱 Usage

1. **Home Screen**: Select a week, then select a day to start the workout
2. **Workout Screen**:
   - Swipe right on each exercise card to mark as completed ✅
   - Swipe left to skip (optional) ⏭️
   - Use bottom buttons as fallback for non-touch devices
3. **Progress**: Your progress is automatically saved to localStorage

## 🎯 Core UX Flow

```
Home → Week Selection → Day Selection → Workout Flow → Completion
```

- **Home**: Lists Week 1-8, tap to expand days
- **Day Selection**: Shows 3 workout days per week with progress
- **Workout**: Full-screen cards with swipe gestures
- **Completion**: Summary screen with stats

## 🔧 Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Framer Motion** for animations and swipe gestures
- **React Router** for navigation
- **LocalStorage** for progress persistence
- **PWA** with service worker for offline support

## 📊 Adding Your Own Workout Program

Currently contains sample Week 1 data. To add your full 8-week program:

1. Open `src/data/program.ts`
2. Add additional weeks to the `programWeeks` array
3. Follow the existing data structure:

```typescript
{
  id: "week2",
  label: "Week 2",
  days: [
    {
      id: "week2-day1",
      label: "Day 1",
      focus: "Upper Body Push",
      exercises: [
        {
          id: "ex2-1",
          name: "Exercise Name",
          sets: 3,
          reps: "8-12",
          rpe: "RPE 7-8",
          rest: "90 sec",
          notes: "Optional form cues"
        }
        // ... more exercises
      ]
    }
    // ... more days
  ]
}
```

## 🚀 Deployment to Vercel

### Method 1: GitHub Integration (Recommended)

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - Workout Planner PWA 🚀 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git branch -M main
git remote add origin https://github.com/yourusername/workout-planner.git
git push -u origin main
```

**Then on Vercel:**
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project" → Select your `workout-planner` repository
3. Vercel auto-detects Vite configuration → Click "Deploy"
4. Your app will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy directly
npm run build
vercel

# Follow prompts to configure project
```

### Manual Deploy

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔄 PWA Installation

- **Android**: Tap "Add to Home Screen" in Chrome
- **iOS**: Share → "Add to Home Screen"
- **Desktop**: Look for install prompt in address bar

## 🎨 Customization

### Colors & Styling
- Edit `tailwind.config.js` for color themes
- Modify `src/index.css` for component styles

### Animations
- Adjust swipe thresholds in `ExerciseCard.tsx`
- Customize transitions in Framer Motion components

### Data Model
- Exercise properties in `src/data/program.ts`
- Storage functions in `src/lib/storage.ts`

## 🐛 Troubleshooting

### Development Issues

**Node.js version warnings**: The app works with Node.js 20.11.1 despite warnings. For best compatibility, upgrade to 20.19.0+.

**Swipe not working**: Ensure you're testing on a touch device or Chrome DevTools mobile simulation.

**Data not persisting**: Check if localStorage is enabled in your browser.

### Production Issues

**PWA not installing**: Ensure HTTPS is enabled and manifest.json is accessible.

**Service worker errors**: Check browser console for registration errors.

## 📝 License

Open source - feel free to use for personal fitness tracking!
