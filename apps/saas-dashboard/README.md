# DSAF SaaS Dashboard

A Next.js (App Router) web application providing a non-technical, drag-and-drop interface for the Design System Audit Framework.

## Features

- **Serverless API Engine (`/api/audit`)**: Securely wraps the `@google/genai` SDK to evaluate files via POST requests without exposing API keys to the client.
- **Vanilla CSS Frontend**: Built without Tailwind to strictly adhere to the CyberSkill design tokens.
- **Historical Tracking**: Integrates with Firebase/Firestore to log audit scores over time.

## Setup & Running Locally

1. Install dependencies:
```bash
npm install
```

2. Set environment variables (create a `.env.local` file):
```env
GEMINI_API_KEY="your-gemini-key"
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-key"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or whichever port Next.js assigns) in your browser. Drag and drop `.tsx` or `.css` files into the UI to execute a live audit.
