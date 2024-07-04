import React from "react";
import styles from "./styles/global.css"
import {Route, Routes} from "react-router-dom";
import DashPage from "./dashpage/DashPage";
import DetailPage from "./dashpage/DetailPage";
import Navbar from "./navbar/Navbar";
import TypePage from "./type/Typepage";
function App() {
  return (
    <div className="common-layout">
      <div className="app-main">
        <Routes>
          <Route path="/"  element={<TypePage/>} />
          <Route path="/dashpage"  element={<DashPage/>} />
          <Route path="/detail"  element={<DetailPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;