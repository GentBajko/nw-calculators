# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a New World Aeternum crafting calculator web application built with vanilla JavaScript and Tailwind CSS. It helps players calculate material requirements and costs for crafting items in the game.

## Architecture

### File Structure
- **Frontend-only application** (no backend/build process)
- `/index.html` - Main HTML file with Tailwind CDN
- `/js/` - JavaScript modules loaded directly in browser
  - `data/` - Game data (recipes, materials)
  - `core/` - Business logic (calculator, storage)
  - `ui/` - UI components (pages, display)
  - `main.js` - Entry point and initialization
- `/css/styles.css` - Custom styles and animations

### Key Components
- **Recipe System**: Nested recipe tree in `js/data/recipes.js` defining crafting requirements
- **Calculator Engine**: Recursive material calculation in `js/core/calculator.js`
- **Storage**: Local storage persistence for prices in `js/core/storage.js`
- **Two-Page UI**: Crafting calculator and materials analysis pages

## Development Commands

This is a static site with no build process. To run locally:

```bash
# Serve with any static file server
python3 -m http.server 8000
# or
npx http-server
```

## Key Implementation Details

### Material Calculation Logic
The calculator uses recursive traversal of the recipe tree to calculate base materials needed. The `calculateMaterials()` function in `js/core/calculator.js` is the core algorithm.

### Daily Craft Limits
Several items have 10/day crafting limits (Runic Leather, Phoenixweave, etc.). The calculator accounts for this when calculating days needed.

### Price Management
- Prices are stored in localStorage
- Import/export functionality for sharing price sets
- Sample prices can be loaded for testing

### UI State Management
- Dark mode toggle with localStorage persistence
- Collapsible categories with smooth animations
- Real-time calculation updates on input changes