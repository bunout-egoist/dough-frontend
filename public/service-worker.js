/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals */
/* global workbox */

const CACHE = "pwabuilder-offline";
const offlineFallbackPage = "/index.html";

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

self.addEventListener("install", async (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
      .catch((error) => {
        console.error("Failed to cache offline page:", error);
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim());
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
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
