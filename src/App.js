import React from "react";
import styles from "./styles/global.css"
import {Route, Routes} from "react-router-dom";
import DashPage from "./dashpage/DashPage";
function App() {
  return (
    <div className="common-layout">
      <div className="app-main">
        <Routes>
          <Route path="/"  element={<DashPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;