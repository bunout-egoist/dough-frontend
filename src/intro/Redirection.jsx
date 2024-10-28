import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../sign/Sign";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";

import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
export default function Redirection() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isNewMember, setIsNewMember] = useState(null);
  const logincode = new URL(window.location.href).searchParams.get("code");
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
    // 알림 권한을 요청
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          // 알림 생성
          new Notification(title, {
            body: message,
          });
        } else {
          console.log("알림 권한이 허용되지 않았습니다.");
        }
      })
      .catch((err) => {
        console.error("알림 권한 요청 중 오류 발생:", err);
      });
  };

  // 환경 구분
  const isNativeApp = Capacitor.isNativePlatform(); // 네이티브 플랫폼인지 확인

  useEffect(() => {
    if (logincode) {
      const getAndSendToken = async () => {
        try {
          let fcmToken = null;

          if (isNativeApp) {
            // 네이티브 환경에서 PushNotifications 사용
            await PushNotifications.requestPermissions();
            const registration = await PushNotifications.register();
            PushNotifications.addListener("registration", (token) => {
              console.log("푸시 알림 토큰:", token.value);
              fcmToken = token.value;
            });

            PushNotifications.addListener("registrationError", (error) => {
              console.error("푸시 알림 등록 오류:", error);
            });
          } else {
            // 웹 환경에서 FCM 사용
            console.log("웹 환경입니다. FCM을 사용합니다.");
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              try {
                fcmToken = await getToken(messaging, {
                  vapidKey:
                    "BKSCCM1MOQZ5KfhXgstx-ZrMJR6P6XRlo3Slb1SI1ct0y4MkeeOZJsTaHkc1o4MUrpk_iHTq1hQtDv2UnUUlibw",
                });
              } catch (error) {
                console.error("FCM 토큰을 가져오는 중 오류 발생:", error);
              }
            } else {
              console.log("알림 권한이 허용되지 않았습니다.");
            }
          }

          console.log(fcmToken, "토큰 존재");
          // 서버로 로그인 요청 전송 (fcmToken이 없으면 null로 전송)
          const response = await fetch(
            `/api/v1/auth/login/kakao?code=${logincode}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fcmToken: fcmToken || null,
              }),
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Received data:", data, data.isNewMember);
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;

            // Store tokens in local storage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            setLoginSuccess(true);
            setIsNewMember(data.isNewMember);
          } else {
            console.error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error during login process:", error);
        }
      };

      getAndSendToken();
    }
  }, [logincode, isNativeApp]);

  useEffect(() => {
    if (loginSuccess && isNewMember !== null) {
      if (isNewMember === true) {
        navigate("/sign");
      } else {
        navigate("/main");
      }
    }
  }, [loginSuccess, isNewMember, navigate]);

  return <div>{loginSuccess ? "로그인 성공" : "로그인 중..."}</div>;
}
