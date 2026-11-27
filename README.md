# Cat Pomodoro

A focus timer with a pixel cat. Set deep work and rest durations, name the task
you are doing, and track focus time and completed sessions for each day.

## Features
- Custom deep work and rest durations
- Task title required before each session starts
- Start, pause, resume, skip, reset and stop
- Sound and browser notification when a session ends
- Daily history and totals, saved locally in your browser
- Floating mini window (draggable, minimizable); pop-out window in Chrome/Edge

## Run locally

### Browser
Open `index.html` directly, or use the Live Server extension in VS Code.

### Desktop app (Electron)
Requires Node.js 22.12 or newer (https://nodejs.org).
From the project folder, run:
   ```
   npm install
   npm start
   ```
The app opens as a small frameless widget at the desktop's lower-right corner.
Drag its header to move it, or use Expand to open the full app.

### Build a Windows installer
Requires Node.js 22.12 or newer (https://nodejs.org).
From the project folder, run:
   ```
   npm install
   npm run dist
   ```
The installer is generated in `dist/`. Build output is intentionally excluded from
version control; build it locally when needed.

## Notes
- The Google Fonts used for the pixel look need an internet connection.
  Without one, the app still works with a fallback font.
- Your history is stored in the browser's local storage (or the Electron app's
  local storage). Clearing site data or uninstalling removes it.

## Project layout
```
cat-pomodoro-app/
├── index.html   # the whole app (HTML, CSS and JavaScript)
├── main.js      # Electron window and widget controls
├── preload.js   # isolated desktop window bridge
├── package.json # scripts and dependencies
├── package-lock.json
├── .gitignore   # excludes dependencies and generated build output
└── README.md
```
