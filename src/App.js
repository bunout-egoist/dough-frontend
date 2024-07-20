import React from "react";
import styles from "./styles/global.css"
import {Route, Routes} from "react-router-dom";
import DashPage from "./dashpage/DashPage";
import DetailPage from "./dashpage/DetailPage";
import Navbar from "./navbar/Navbar";
import TypePage from "./type/Typepage";
import Setting from "./settings/Setting";
import Nickname from "./settings/Nickname";
import Mainpage from "./main/Mainpage";

function App() {
  return (
    <div className="common-layout">
      <div className="app-main">
        <div className="page-area">
          <Routes>
            <Route path="/"  element={<Mainpage/>} />
            <Route path="/setting"  element={<Setting/>} />
            <Route path="/typepage" element={<TypePage/>}/>
            <Route path="/dashpage"  element={<DashPage/>} />
            <Route path="/detail"  element={<DetailPage/>} />
            <Route path="/nickname"  element={<Nickname/>} />
          </Routes>
        </div>
       <Navbar/>
      </div>
    
    </div>
  );
}

export default App;