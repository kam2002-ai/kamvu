# FITNESS OS Prototype

Vanilla HTML/CSS/JavaScript prototype. No npm, build step, framework, or extra package required.

## Run locally
1. Open this folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The prototype opens in your browser. If you do not use Live Server, use a local static server because the app uses JavaScript modules.

## Screens and prototype routes
- `#/onboarding` — 01 Profile setup
- `#/dashboard` — 02 Today Dashboard
- `#/training` — 03 Training Overview
- `#/training/active` — 04 Active Workout
- `#/training/history` — 05 Workout History
- `#/running` — 06 Run Dashboard
- `#/running/detail` — 07 Run Detail
- `#/running/log` — Manual run entry
- `#/nutrition`, `#/progress`, `#/profile`, `#/integrations` — upcoming modules

## Clickable prototype flows
- Dashboard → Training → Start workout → Active Workout
- Training → View all completed sessions → Workout History → expand a session → Repeat workout
- Bottom navigation → Running → choose an activity → Run Detail
- Run Dashboard → **Ghi nhận** → enter a manual run → save → back to Run Dashboard
- Run Detail → share action (native share sheet when supported, clipboard fallback otherwise)

Workout history filters and search are interactive. Manual run entries are saved in browser LocalStorage. Demo metrics and historical sessions are sample data. Apple Health and Strava are not connected to live accounts yet; the labels in this prototype indicate intended data sources only.


## Prototype screens 08–10
- `#/nutrition`: Nutrition dashboard with calorie/macros summary, meal log, add/remove food and water tracking.
- `#/nutrition/add?meal=Bữa trưa`: Food search, category filters, quick-add and custom food form.
- `#/progress`: Body metrics dashboard with weight trend and editable weight/waist/body-fat measurements.

Nutrition entries and body measurements are stored locally in `localStorage`. These are prototype data flows; Apple Health and Strava APIs are not connected yet.


## v5 – 11–13
- `#/progress`: 7/30/90/all-day progress with body metrics entry.
- `#/body-metrics`: existing body measurements form.
- `#/integrations`: Apple Health and Strava **demonstration only**. No live OAuth or HealthKit access.
- `#/profile`: editable display name, notifications setting, local JSON export and reset.
- Dashboard avatar → Profile → Integrations; bottom Progress tab → Progress → Body Metrics.
