import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"
import { BrowserRouter } from 'react-router-dom';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// serviceWorkerRegistration.register();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => {
      console.log("Okey!");
    })
    .catch((error) => {
      cosole.log("FAIL", error);
    });
}

