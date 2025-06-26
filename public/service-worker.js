const CACHE = "pwabuilder-offline";
const offlineFallbackPage = "/index.html"; // 실제 오프라인 페이지로 변경

// Workbox library import
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

// Listen for SKIP_WAITING event to update the service worker immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Register a route to cache requests and use stale-while-revalidate strategy
workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);

// Install event - cache the offline fallback page
self.addEventListener("install", async (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => {
        console.log("Caching offline page");
        return cache.add(offlineFallbackPage);
      })
      .catch((error) => {
        console.error("Failed to cache offline page:", error);
      })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim());
});

// Enable navigation preload if supported
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Fetch event - handle offline navigation
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          // Try preload response first
          const preloadResp = await event.preloadResponse;
          if (preloadResp) {
            return preloadResp;
          }

          // Try network request
          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          // Network failed, serve offline page
          console.log("Network failed, serving offline page");
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return (
            cachedResp ||
            new Response("Offline page not found", { status: 404 })
          );
        }
      })()
    );
  }
});
