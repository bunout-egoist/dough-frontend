import React from "react";
import styles from "./styles/global.css";
import { Route, Routes, useLocation } from "react-router-dom";
import DashPage from "./dashpage/DashPage";
import DetailPage from "./dashpage/DetailPage";
import Navbar from "./navbar/Navbar";
import TypePage from "./type/Typepage";
import Setting from "./settings/Setting";
import Nickname from "./settings/Nickname";
import Mainpage from "./main/Mainpage";
import Intro from "./intro/Intro";
import Sign from "./sign/Sign";
import Info from "./sign/Info";
import Redirection from "./intro/Redirection";
import MainLevel from "./main/MainLevel";
import Quest from "./type/Quest";
import Tutorial from "./tutorial/Tutorial";
import EditType from "./settings/page/EditType";
function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/intro", "/sign","/sign/info", "/typepage","/typepage/quest","/tutorial","/setting/edit-type"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="common-layout">
      <div className="app-main">
        <div>
          <Routes>
            <Route path="/oauth2/callback/kakao" element={<Redirection/>}/>
            <Route path="/intro" element={<Intro />} />
            <Route path="/setting/edit-type" element={<EditType/>}/>
            <Route path="/typepage/quest" element={<Quest />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/sign/info" element={<Info />} />
            <Route path="/" element={<Mainpage />} />
            <Route path="/level" element={<MainLevel />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/typepage" element={<TypePage />} />
            <Route path="/dashpage" element={<DashPage />} />
            <Route path="/detail/:date" element={<DetailPage />} />
            <Route path="/nickname" element={<Nickname />} />
          </Routes>
        </div>
        {shouldShowNavbar && <Navbar />}
      </div>
    </div>
  );
}

export default App;
