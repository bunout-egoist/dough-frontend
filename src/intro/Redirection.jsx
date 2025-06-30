import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Browser } from "@capacitor/browser"; // Import Browser from Capacitor
export default function Redirection() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isNewMember, setIsNewMember] = useState(null);
  const logincode = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const sendLoginRequest = async () => {
    try {
      const response = await fetch(
        `/api/v1/auth/login/kakao?code=${logincode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fcmToken: null,
          }),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

        setLoginSuccess(true);
        setIsNewMember(data.isNewMember);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        console.error("Network response was not ok");
      }
    } catch (error) {
      console.error("Login request error:", error);
    }
  };

  useEffect(() => {
    if (logincode) {
      sendLoginRequest();
    }
  }, [logincode]);

  useEffect(() => {
    if (loginSuccess && isNewMember !== null) {
      if (isNewMember === true) {
        Browser.open({
          url: "/sign",
          windowName: "_self",
          enableUrlBarHiding: true, // URL 바 숨기기
          hideUrlBar: true, // URL 바 숨기기
          presentationStyle: "fullscreen", // 전체화면 모드
        });

        navigate("/sign");
      } else {
        Browser.open({
          url: "/main",
          windowName: "_self",
          enableUrlBarHiding: true, // URL 바 숨기기
          hideUrlBar: true, // URL 바 숨기기
          presentationStyle: "fullscreen", // 전체화면 모드
        });

        navigate("/main");
      }
    }
  }, [loginSuccess, isNewMember, navigate]);

  return <div>{loginSuccess ? "로그인 성공" : "로그인 중..."}</div>;
}
