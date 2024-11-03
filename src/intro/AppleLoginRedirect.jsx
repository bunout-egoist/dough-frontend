import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

export default function AppleLoginRedirect() {
  const location = useLocation();
  const appleData = location.state?.res;

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isNewMember, setIsNewMember] = useState(null);
  const navigate = useNavigate();

  const firebaseConfig = {
    apiKey: "AIzaSyAtJWz7IMbcsh65wvTJsr7xzsmpIMDD-Ao",
    authDomain: "bunout-2ed63.firebaseapp.com",
    projectId: "bunout-2ed63",
    storageBucket: "bunout-2ed63.appspot.com",
    messagingSenderId: "1064933370265",
    appId: "1:1064933370265:web:3251f0d0af4f04fb170b08",
    measurementId: "G-ZMM294BFWY",
  };

  // Firebase 앱 초기화
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  const showNotification = (title, message) => {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body: message });
        } else {
          console.log("알림 권한이 허용되지 않았습니다.");
        }
      })
      .catch((err) => {
        console.error("알림 권한 요청 중 오류 발생:", err);
      });
  };

  const getFcmToken = async () => {
    let fcmToken = null;
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        fcmToken = await getToken(messaging, {
          vapidKey:
            "BKSCCM1MOQZ5KfhXgstx-ZrMJR6P6XRlo3Slb1SI1ct0y4MkeeOZJsTaHkc1o4MUrpk_iHTq1hQtDv2UnUUlibw",
        });
        console.log("FCM 토큰:", fcmToken);
      } catch (error) {
        console.error("FCM 토큰을 가져오는 중 오류 발생:", error);
      }
    } else {
      showNotification("BUNOUT", "어플설정에 들어가 알림 설정을 허용해주세요!");
    }
    return fcmToken;
  };

  const loginWithApple = async (fcmToken) => {
    try {
      const response = await fetch(
        `/api/v1/auth/login/apple?idToken=${appleData.authorization.id_token}&authorizationCode=${appleData.authorization.code}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fcmToken: fcmToken || null }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Received data:", data, data.isNewMember);

      const { accessToken, refreshToken } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setLoginSuccess(true);
      setIsNewMember(data.isNewMember);
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (appleData) {
      const handleLogin = async () => {
        const fcmToken = await getFcmToken();
        await loginWithApple(fcmToken);
      };
      handleLogin();
    }
  }, [appleData]);

  useEffect(() => {
    if (loginSuccess && isNewMember !== null) {
      if (isNewMember) {
        navigate("/sign");
      } else {
        navigate("/main");
      }
    }
  }, [loginSuccess, isNewMember, navigate]);

  return <div>{loginSuccess ? "로그인 성공" : "로그인 중..."}</div>;
}
