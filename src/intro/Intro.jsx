import React, { useState, useEffect } from "react";
import styles from "./intro.css"; // eslint-disable-next-line
import { isPlatform } from "@ionic/react";
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
import IntroPop from "../popup/IntroPop";
import { useNavigate } from "react-router-dom";
import { Browser } from "@capacitor/browser";
import { App } from "@capacitor/app";

export default function Intro() {
  const [isIos, setIsIos] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);
  const [nonAllow, setNonAllow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    requestCameraPermission();

    const checkPlatform = async () => {
      if (isPlatform("ios")) {
        setIsIos(true);
      } else if (isPlatform("android")) {
        setIsIos(false);
      } else {
        const userAgent = window.navigator.userAgent || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          setIsIos(true);
        } else if (/Macintosh/.test(userAgent) && "ontouchend" in document) {
          setIsIos(true);
        } else {
          setIsIos(false);
        }
      }
    };

    checkPlatform();
    const timer = setTimeout(() => {
      setShowNextPage(true);
    }, 3000);

    // App URL 핸들러 (딥링크 처리)
    const handleAppUrlOpen = async (event) => {
      const { url } = event;
      console.log("App URL opened:", url);

      if (url.includes("code=")) {
        const urlParams = new URLSearchParams(url.split("?")[1]);
        const code = urlParams.get("code");
        if (code) {
          console.log("Kakao auth code from deep link:", code);
          handleKakaoCallback(code);
        }
      }
    };

    // App URL 리스너 등록
    App.addListener("appUrlOpen", handleAppUrlOpen);

    // 브라우저에서 메시지 수신 리스너 (웹용)
    const handleBrowserMessage = (event) => {
      if (event.data && event.data.type === "KAKAO_LOGIN_SUCCESS") {
        console.log("Kakao auth code:", event.data.code);
        handleKakaoCallback(event.data.code);
        Browser.close();
      }
    };

    // postMessage 리스너 등록
    window.addEventListener("message", handleBrowserMessage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("message", handleBrowserMessage);
      App.removeAllListeners();
    };
  }, []);

  // 카카오 콜백 처리 함수
  const handleKakaoCallback = async (code) => {
    try {
      // 여기서 서버 API를 호출하여 토큰 교환
      const response = await fetch("/api/v1/auth/login/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          fcmToken: null,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (data && data.accessToken) {
        // 로그인 성공 처리
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // 신규/기존 회원 분기
        if (data.isNewMember === true) {
          navigate("/sign");
        } else {
          navigate("/main");
        }
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 수정된 loginHandler
  const loginHandler = async () => {
    try {
      const KEY = "8a6e7b4b0b03c895fc6795146375d6ac";

      if (isPlatform("mobile") || isPlatform("hybrid")) {
        // 모바일 앱에서는 커스텀 스키마를 사용
        const REDIRECT_URI = "bunoutapp://kakao/callback"; // 또는 앱에서 설정한 커스텀 스키마
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

        await Browser.open({
          url: link,
          windowName: "_self",
          toolbarColor: "#000000",
          presentationStyle: "popover",
        });
      } else {
        // 웹에서는 기존 방식 사용
        const REDIRECT_URI = "https://app.bunout.info/oauth2/callback/kakao";
        const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = link;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera access granted");
      setNonAllow(false);
    } catch (err) {
      console.error("Camera access denied", err);
      alert("카메라 접근이 필요합니다. 설정에서 카메라 권한을 허용해주세요.");
      setNonAllow(true);
      console.log(nonAllow);
    }
  }

  const handlePopClose = () => {
    setNonAllow(false);
  };

  const [gifSrc, setGifSrc] = useState("/images/intro/onboard.gif");

  return (
    <div className="intropage">
      {nonAllow ? <IntroPop onClose={handlePopClose} /> : <div></div>}
      {!showNextPage ? (
        <FirstPage />
      ) : (
        <div className="nextpage">
          <div className="profile-img">
            <img src={`${gifSrc}?${new Date().getTime()}`} alt="gif" />
          </div>
          <div className="into-bottom">
            <div className="intro-bottom-abs">
              <div
                className="intropage-sns intropage-kakao"
                onClick={loginHandler}
              >
                <div className="intropage-kakao-img">
                  <img
                    src="/images/intro/kakao.png"
                    className="img-width"
                    alt="Kakao Login"
                  />
                </div>
              </div>
              <Link to="/tutorial">
                <div className="landing-tuto">서비스 둘러보기</div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
