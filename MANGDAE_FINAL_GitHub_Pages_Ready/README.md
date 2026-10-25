# MANGDAE — React + Vite frontend

A static, GitHub Pages-ready implementation based on the MANGDAE designer mockups.

## October 25, 2026 — menu and background correction

The desktop menu-open layout was adjusted after a reported mirrored background and collapsed pill buttons at a 1428×857 DevTools viewport.

- The hero image uses a regular HTML `<img>` with `object-fit: cover` instead of a CSS background. The original `src/assets/hero.jpg` remains unchanged and displays with the man on the right.
- Menu-open desktop cards keep a real minimum height, with a three-column grid. The left menu has room while the MORPH, LUCID, and HAZE cards remain wide and readable.
- The MENU/CLOSE button toggles the menu; the X, Escape key, and clicking the dimmed background also close it.
- Phones at or below 700px show three full-width vertically stacked cards and a mobile drawer.
- The collection cards use the original MORPH, LUCID, and HAZE images. No separate cropped pill-image assets are used.
- The large “MORE THAN EYEWEAR” hero lettering is removed.

### Installing the patch

If you are using the immediately preceding responsive-toggle version, replace **both** files:

```
src/App.jsx
src/styles.css
```

No image replacements are needed. If your project differs from the preceding version, use the full project ZIP instead.

### Verification

A Chromium static equivalent of the React layout was rendered and visually inspected at **1428×857**, **1150×690**, **1024×768**, **820×820**, **700×850**, **390×844**, and **320×640**, with screenshots in both menu states. Card dimensions were checked to prevent collapsed-height slits, horizontal overflow was checked, and menu toggle, outside-click, and Escape behavior were exercised. `App.jsx` passed TypeScript's JSX syntax/transpilation check. This does not replace a full React/Vite production build; the dependency installation was not available in this environment.

## Run locally

Use Node.js 20.19 or later (22 recommended).

```bash
npm install
npm run dev
```

Open the localhost URL shown by Vite.

Production build:

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

1. Push the project root to a GitHub repository.
2. In repository Settings → Pages, select **GitHub Actions** under Build and deployment.
3. The existing `.github/workflows` deployment workflow builds and publishes the project.

The Vite config uses a relative `base: './'` so assets work on GitHub Pages project subpaths. Navigation uses URL hashes and needs no server-side routing.

## Configuration

Edit `src/siteConfig.js` to set your contact email. The website is frontend-only; there is no checkout or backend email service. The email form uses the visitor's email client.
