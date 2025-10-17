# FBK Markets Website

This repository contains the production build of the FBK Markets marketing website. The `dist/` directory holds ready-to-serve HTML, CSS, JavaScript, fonts, and assets that power the public site.

## Features
- Responsive Bootstrap 5 navigation with mobile-friendly accordion menus
- Hero carousel with promotional messaging and animated callouts
- Informational pages that cover account types, advantages, regulation, FAQ, and more
- SVG/PNG imagery, iconography via Font Awesome, and custom fonts preloaded for performance
- Mobile-specific UX refinements, including simplified login buttons and touch-friendly layouts

## Getting Started
1. Clone or download the repository.
2. Serve the `dist/` folder with any static web server. Example:
   ```bash
   npx serve dist
   ```
3. Open `http://localhost:3000` (or the reported address) to preview the site.

No build step is required—the files are already transpiled and minified where necessary.

## Project Structure
```
+-- dist/
¦   +-- css/                # Compiled stylesheets (Bootstrap overrides, theme styles)
¦   +-- js/                 # JavaScript for navigation, widgets, utilities
¦   +-- fonts/              # Webfont assets used across the site
¦   +-- img/                # Images, illustrations, and icons
¦   +-- *.html              # Page templates (index, FAQ, account types, etc.)
¦   +-- README.md           # Project overview (this file)
+-- ...
```

## Editing the Site
- Update global styling in `dist/css/fbk-overrides.css` and `dist/css/style.css`.
- Adjust the shared header/footer via `dist/_header.html` and `dist/_footer.html`.
- Page-specific content lives in the corresponding `.html` files under `dist/`.

When editing HTML or CSS, ensure you keep the responsive tweaks intact—particularly the mobile navigation pattern implemented in `config-theme.js` and `fbk-overrides.css`.

## Browser Support
Tested on the latest versions of Chrome, Firefox, Edge, and Safari. Legacy browsers may require additional polyfills that are not bundled in this build.

## Contributing
1. Create a new branch for your feature or fix.
2. Make and test your changes locally.
3. Submit a pull request with a clear description of the updates and any testing performed.

## License
All assets, trademarks, and content are © FBK Markets. Redistribution or reuse outside official FBK projects is prohibited without prior written consent.
