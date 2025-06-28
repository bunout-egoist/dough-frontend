import React from "react";
import { useEffect } from "react";
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
import AppleLogin from "react-apple-login";
import QuestType from "./settings/page/QuestType";
import EditQuest from "./settings/page/EditQuest";
import FinishSign from "./intro/FinishSign";
import AppleLoginRedirect from "./intro/AppleLoginRedirect";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
function App() {
  // // 알람수신 받는곳
  // useEffect(() => {
  //   if (Capacitor.isNativePlatform()) {
  //   // 푸시 알림 리스너 등록
  //   PushNotifications.addListener('pushNotificationReceived', (notification) => {
  //     console.log('푸시 알림 수신:', notification);
  //     alert(`새로운 알림: ${notification.title} - ${notification.body}`);
  //   });

  //   PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
  //     console.log('푸시 알림 클릭:', notification);
  //     // 알림 클릭 시 수행할 동작 설정
  //     alert(`알림 클릭: ${notification.notification.data}`);
  //   });}
  // }, []);

  const location = useLocation();

  const hideNavbarRoutes = [
    "/",
    "/sign",
    "/sign/info",
    "/typepage",
    "/typepage/quest",
    "/tutorial",
    "/setting/edit-type",
    "/nickname",
    "/setting/edit-type/quest",
    "/setting/edit-quest",
    "/finish",
    "/redirect/apple",
  ];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="common-layout">
      <div className="app-main">
        <div>
          <Routes>
            <Route path="/oauth2/callback/kakao" element={<Redirection />} />
            <Route path="/redirect/apple" element={<AppleLoginRedirect />} />
            <Route path="/" element={<Intro />} />
            <Route path="/finish" element={<FinishSign />} />
            <Route path="/setting/edit-type" element={<EditType />} />
            <Route path="/setting/edit-type/quest" element={<QuestType />} />
            <Route path="/setting/edit-quest" element={<EditQuest />} />
            <Route path="/typepage/quest" element={<Quest />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/sign/info" element={<Info />} />
            <Route path="/main" element={<Mainpage />} />
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
