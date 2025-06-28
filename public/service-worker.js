// /* eslint-env serviceworker */
// /* eslint-disable no-restricted-globals */
// /* global workbox */

// const CACHE = "pwabuilder-offline";
// const offlineFallbackPage = "/index.html";

// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
// );

// // Listen for SKIP_WAITING event to update the service worker immediately
// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// workbox.routing.registerRoute(
//   ({ request }) => {
//     const url = new URL(request.url);
//     const excludedDomains = [
//       "kauth.kakao.com",
//       "accounts.google.com",
//       "appleid.apple.com",
//       "oauth.kakao.com",
//     ];

//     return !excludedDomains.some((domain) => url.hostname.includes(domain));
//   },
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: CACHE,
//   })
// );

// workbox.routing.registerRoute(
//   ({ request }) => {
//     return (
//       request.destination === "script" ||
//       request.destination === "style" ||
//       request.destination === "image" ||
//       request.destination === "font" ||
//       request.destination === "manifest"
//     );
//   },
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: CACHE + "-static",
//   })
// );

// self.addEventListener("install", async (event) => {
//   console.log("Service Worker installing...");
//   event.waitUntil(
//     caches
//       .open(CACHE)
//       .then((cache) => cache.add(offlineFallbackPage))
//       .catch((error) => {
//         console.error("Failed to cache offline page:", error);
//       })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service Worker activating...");
//   event.waitUntil(self.clients.claim());
// });

// if (workbox.navigationPreload.isSupported()) {
//   workbox.navigationPreload.enable();
// }

// self.addEventListener("fetch", (event) => {
//   // 네비게이션 요청 처리 (페이지 로드)
//   if (event.request.mode === "navigate") {
//     const url = new URL(event.request.url);
//     const authDomains = [
//       "kauth.kakao.com",
//       "accounts.google.com",
//       "appleid.apple.com",
//       "oauth.kakao.com",
//     ];

//     // 외부 인증 서비스면 그대로 통과
//     if (authDomains.some((domain) => url.hostname.includes(domain))) {
//       return;
//     }

//     event.respondWith(
//       (async () => {
//         try {
//           const preloadResp = await event.preloadResponse;

//           if (preloadResp) {
//             return preloadResp;
//           }

//           const networkResp = await fetch(event.request);
//           return networkResp;
//         } catch (error) {
//           console.log("Network failed, serving offline page");
//           const cache = await caches.open(CACHE);
//           const cachedResp = await cache.match(offlineFallbackPage);
//           return (
//             cachedResp ||
//             new Response("Offline page not found", { status: 404 })
//           );
//         }
//       })()
//     );
//   }
// });
