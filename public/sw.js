// public/service-worker.js

const CACHE = "pwabuilder-offline";

// Workbox library import
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Listen for SKIP_WAITING event to update the service worker immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Register a route to cache requests and use stale-while-revalidate strategy
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);
