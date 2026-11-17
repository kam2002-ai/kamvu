# FITNESS OS – Architecture

- `index.html`: single app entry point.
- `css/`: design tokens, shared components, layouts, and page styles.
- `js/core/`: hash router, app state, local storage, placeholders.
- `js/features/`: feature-specific screens and interactions.
- `data/`: reserved for mock data and constants.
- `docs/`: project documentation.

## Prototype navigation
`#/onboarding` → `#/dashboard` → `#/training` → `#/training/active`.
Bottom navigation links Dashboard, Training, Running, Nutrition, and Progress.
Dashboard workout CTA opens Training; Training CTA opens Active Workout.
Active Workout has interactive set checkboxes, add-set controls, rest timer controls, finish and cancel actions.

## Current scope
Onboarding, Today Dashboard, Training Overview, and Active Workout are implemented as a clickable visual prototype. History and other modules remain clearly labeled placeholders. Data shown in dashboard/training is sample data; Strava and Apple Health integrations are future work.

## Run
Open `index.html` using VS Code Live Server. ES modules require a local server, not `file://`.
