# ProductivityTracker

ProductivityTracker is a task-tracking application built with **React**, **TypeScript**, and **Electron**. It allows users to manage their tasks effectively by adding to-do items with titles, bullet points, and important links. The app is designed to run as a desktop application using Electron.

## Features

- **Task Management**: Add, view, and delete tasks.
- **Bullet Points**: Each task can have a list of bullet points, which can be marked as completed or incomplete.
- **Important Links**: Attach links to tasks for quick access to relevant resources.
- **Persistent Storage**: Tasks are saved in `localStorage` to ensure they persist across sessions.
- **Cross-Platform**: Built with Electron, the app can run on Windows, macOS, and Linux.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ProductivityTracker.git
   cd productivity-app
   npm install
   ```
2. Run a local version
   ```bash
   cd productivity-app
   npm run dev
   ```
3. How to Build the app
   ```bash
   cd productivity-app
   npm run build
   ```

## Tech Stack

ProductivityTracker is built using the following technologies:

### Frontend
- **React**: Used for building the user interface.
- **TypeScript**: Provides type safety and better tooling.
- **CSS**: For styling the application.

### Backend
- **Electron**: A framework for building cross-platform desktop applications using web technologies.

### Build Tools
- **Vite**: A fast build tool for modern web projects, used for development and production builds.

### Storage
- **localStorage**: Used for persisting tasks locally in the browser.