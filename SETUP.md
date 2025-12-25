# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

### Control Panel (Left/Top on mobile)
- **Player Name:** Text input (auto-uppercase)
- **Overall Rating:** Number input (1-99)
- **Position:** Dropdown (ST, RW, LW, CM, CB, GK)
- **Photo Upload:** Click to upload player image
- **Stats Sliders:** Adjust 6 stats (Pace, Shooting, Passing, Dribbling, Defending, Physical)
- **Training Hub:** Select a skill and click "Train This Skill" to open YouTube tutorials

### Card Preview (Right/Bottom on mobile)
- Premium "Legacy Edition" card design
- Real-time updates as you edit
- Light blue (#00d2ff) accents and borders
- Subtle gradients and shadows
- **Download Button:** Export as PNG using html2canvas

## Features

✅ Fully responsive (mobile-first)  
✅ Dark mode (#121212 background)  
✅ Premium card design with gradients  
✅ Real-time preview  
✅ YouTube training integration  
✅ PNG export functionality  

## Troubleshooting

- **Port already in use?** Try: `npm run dev -- -p 3001`
- **Modules not found?** Run: `npm install`
- **Build errors?** Delete `.next` folder and run: `npm run dev`

## Build for Production

```bash
npm run build
npm start
```

Enjoy building your Legacy! 🏆

