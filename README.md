# Legacy - Player Card Generator

A premium player card generator and training hub built with Next.js, Tailwind CSS, and Lucide React.

## Features

- 🎨 Premium dark mode UI with sleek design
- 📱 Fully responsive (mobile-first design)
- 🎮 Create custom player cards with:
  - Player name, rating, and position
  - Upload custom photos
  - Adjust 6 key stats (Pace, Shooting, Passing, Dribbling, Defending, Physical)
- 🏋️ Training Hub - Direct YouTube integration for skill training videos
- 💾 Export your cards as high-quality PNG images

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Export:** html2canvas
- **Language:** TypeScript

## Design

- **Background:** #121212 (Dark Mode)
- **Primary Accent:** #00d2ff (Legacy Blue)
- **Typography:** Inter (Modern Sans-Serif)

## Project Structure

```
Legacy/
├── app/
│   ├── components/
│   │   ├── ControlPanel.tsx    # Input controls and training hub
│   │   └── CardPreview.tsx     # Premium card display and export
│   ├── globals.css             # Global styles with Tailwind
│   ├── layout.tsx              # Root layout with header
│   └── page.tsx                # Main page with state management
├── public/                     # Static assets
└── package.json                # Dependencies
```

## Usage

1. **Create Your Card:**
   - Enter player name, rating (1-99), and position
   - Upload a player photo
   - Adjust stats using the sliders (1-99)

2. **Train Skills:**
   - Select a skill from the dropdown
   - Click "Train This Skill" to open YouTube tutorials

3. **Export:**
   - Click "Download Legacy Card" to save as PNG

---

Built with ❤️ for the Legacy community

Last updated: 2025-12-25

