// serviceWorkerRegistration.js
// 이 파일은 React 앱에서 서비스 워커를 등록하는 데 사용됩니다.

// serviceWorker.js는 앱에 따라 다를 수 있으므로 실제 파일 이름과 경로를 확인하세요.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = `/service-worker.js`;

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((error) => {
        console.error("SW registration failed: ", error);
      });
  });
}
