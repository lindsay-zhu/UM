# Welcome to the Company

A local classroom ethics game built with React, Vite, and Framer Motion. No backend, database, authentication, remote fonts, audio, or runtime network dependencies.

## Present offline

On Windows, double-click **START-GAME.cmd**. You can also open **dist/index.html** directly in Chrome or Edge. All JavaScript, styles, and images are embedded in that one file. You can copy the complete folder to a USB drive and open it on another computer without installing anything. Press **F** or use the top-right presentation button for fullscreen. The game fits a 1920 × 1080 canvas within the available screen, preserving a 16:9 aspect ratio without scrolling.

## Controls

- Play starts a fresh simulation.
- Right Arrow / Space: reveal the next dialogue or rule, then advance to the next scene. Discussion screens never advance automatically.
- Left Arrow: undo the latest reveal, or return to the previous scene.
- Escape / Home icon: main menu.
- F: toggle fullscreen. F11 is a browser fallback if fullscreen is restricted.
- Clicking a decision records a choice without advancing or judging it. NEXT is presenter controlled. Revisiting the scene retains the choice; restarting clears it.
- Character cards open profiles. Menu character browsing returns home without advancing the story.
- On FINAL DECISION, click the green diamond in the upper-left brand five times to expose the locked joke. Clicking its lock shows “Psychopathy level too low.” It never becomes an available or recommended choice.

## Edit and build

```sh
npm install
npm run dev
npm run build
npm test
```

Installation needs internet once; the built game does not. `npm run build` replaces `dist/index.html`. Node 20.19+ or 22.12+ is required by Vite.

Edit `src/data/storyData.js` for story copy, characters, appraisal rows, and seven team entries. Four presenter names, personal team portraits, and all contributions were absent from the provided deck and are left unassigned. Import local images and set each member’s `portrait` to that import to embed team photos in the next build. Use short contributions so all seven rows remain readable.

## Structure

`App` owns the game state, asset preload, fullscreen, viewport scaling, and keyboard controls. `SceneRouter` selects scene components. `gameState.js` defines the reducer, presenter reveal limits, menu visits, and choice behavior. Reusable components live in `src/components`; scene compositions in `src/scenes`; styles in `src/styles`; imported imagery in `src/assets`.

See `DESIGN.md` for the PowerPoint inspection, asset provenance, and scene mapping. The original PowerPoint is preserved.
