const CACHE = 'fitness-os-pwa-v1';
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-180.png",
  "./icons/icon-512.png",
  "./css/main.css",
  "./js/app.js",
  "./js/features/integrations.js",
  "./js/features/shared-nav.js",
  "./js/features/profile.js",
  "./js/core/storage.js",
  "./js/core/router.js",
  "./js/core/placeholder.js",
  "./js/core/state.js",
  "./js/features/onboarding/onboarding.js",
  "./js/features/training/training.js",
  "./js/features/running/running.js",
  "./js/features/running/run-log.js",
  "./js/features/running/run-detail.js",
  "./js/features/dashboard/dashboard.js",
  "./js/features/nutrition/nutrition.js",
  "./js/features/progress/body-metrics.js",
  "./js/features/progress/progress.js",
  "./js/features/training/pages/workout-history.js",
  "./js/features/training/pages/active-workout.js",
  "./js/features/onboarding/pages/profile-setup.js",
  "./css/base/variables.css",
  "./css/base/typography.css",
  "./css/base/reset.css",
  "./css/pages/nutrition-metrics.css",
  "./css/pages/fitness-app.css",
  "./css/pages/running-history.css",
  "./css/pages/progress-integrations-profile.css",
  "./css/pages/placeholders.css",
  "./css/pages/onboarding.css",
  "./css/layouts/app-shell.css",
  "./css/components/cards.css",
  "./css/components/forms.css",
  "./css/components/buttons.css"
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
