
# Test-task

## How to Run
Clone the repository, install dependencies and run:

```bash
git clone https://github.com/yourusername/backbone-spa-test.git
cd test-task-spa
npm install
npm run dev

Open your browser at: http://localhost:5173

To run tests:
npm run test

## Overview of What Was Done
# Custom Router:
Backbone.Router synchronizes menu, tab, and collapsed states with the URL.
Browser back/forward buttons restore the previous state.
The URL fully reflects the app state.

# Deep Linking:
Opening a saved URL restores the correct menu, tab, and collapsed blocks.

# Data Loading & Caching:
Data is fetched from /mock/content.data.json and cached for performance.

# Error Handling:
Async operations and rendering are wrapped in try/catch.
Fallbacks are implemented for missing data or invalid routes.

# Testing:
Basic unit tests for utilities and views using Vitest.

# Architecture:
Modular project structure ready for future extensions and maintainable growth.
