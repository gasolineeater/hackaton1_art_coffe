# Installation and Usage Guide

This document provides instructions for installing and using the Café Companion App.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:gasolineeater/hackaton1_art_coffe.git
   cd cafe-companion
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
cafe-companion/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context for state management
│   ├── data/            # Mock data for development
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API and service functions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── README.md            # Project documentation
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Development Workflow

1. **Feature Branches**: Create a new branch for each feature you're working on
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Commit Messages**: Use clear, descriptive commit messages
   ```bash
   git commit -m "Add: feature description"
   ```

3. **Pull Requests**: Create a pull request when your feature is ready for review

## Available Features

1. **Digital Gift Cards**
   - Send digital gift cards to friends and family
   - Include personalized messages
   - Easy redemption process in-store or online

2. **Custom Coffee Ordering**
   - Customize coffee orders with various options
   - Browse the full café menu
   - Place orders for pickup or table delivery
   - Receive notifications when orders are ready

3. **Loyalty Program**
   - Point-based system for purchases
   - Track points and available rewards
   - Redeem points for free items

4. **Table-side Ordering via QR Codes**
   - Scan QR code on the table
   - View menu and place orders directly
   - No waiting in line required

## Technical Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Backend**: Firebase/Supabase (TBD)
- **Authentication**: Firebase Auth/Supabase Auth (TBD)

## Design Guidelines

- **Color Palette**:
  - Primary: #4A2C2A (Coffee Brown)
  - Secondary: #D4A76A (Latte)
  - Accent: #8C6B4F (Mocha)
  - Background: #FAF7F2 (Cream)
  - Text: #2D2926 (Dark Roast)

- **Typography**:
  - Headings: Poppins
  - Body: Inter
