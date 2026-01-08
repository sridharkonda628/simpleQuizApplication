# Simple Quiz Application

A responsive, premium-designed Quiz Application built with React and Vite. Users can test their knowledge with 15 questions fetched from the OpenTDB API.

## Features

- **Dynamic Question Fetching**: Retrieves 15 random questions from OpenTDB.
- **Timer**: 30-minute countdown with auto-submit functionality.
- **Navigation**: Skip to any question via the Overview Panel or use Next/Previous controls.
- **Overview Panel**: Visual indicators for Active, Answered, and Pending questions.
- **Responsive Design**: Adapts seamlessly to mobile and desktop screens.
- **Premium UI**: Modern dark theme with smooth transitions and glassmorphism elements.

## Tech Stack

- **Framework**: React + Vite
- **Routing**: React Router DOM v7
- **Styling**: Vanilla CSS (Variables, Flexbox/Grid)
- **State Management**: React Context API + useReducer
- **Utilities**: `he` for HTML entity decoding.

## Setup & Installation

1.  **Clone the repository** (if applicable).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run locally**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

4.  **Build for production**:
    ```bash
    npm run build
    ```
    The output will be in the `dist` folder, ready for deployment to Netlify, Vercel, etc.

## Assumptions

- The API availability (OpenTDB) is presumed consistent.
- Identify persistence is session-based; refreshing the page on the quiz restarts the session by design (simple app).
- "Visited" in requirements maps to "Viewed or Answered", implemented as status indicators.

## Challenges & Solutions

- **API Text Encoding**: The OpenTDB API returns HTML entities (e.g., `&quot;`). 
  - *Solution*: Integrated the `he` library to decode these strings before rendering.
- **State Management**: Managing timer, answers, and navigation centrally.
  - *Solution*: Implemented a `QuizContext` with a Reducer pattern to handle complex state transitions (Time tick, Answer selection, Navigation).
- **Navigation Sync**: Keeping the "Current Question" in sync with the Palette and Views.
  - *Solution*: Centralized `currentQuestionIndex` in the store and computed derived state for the UI.

## Deployment

To deploy:
1.  Run `npm run build`.
2.  Upload the `dist` folder to your hosting provider (e.g., Netlify drop).

