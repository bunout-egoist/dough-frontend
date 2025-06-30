import React, { useState, useEffect } from "react";
import styles from "./intro.css"; // eslint-disable-next-line
import { isPlatform } from "@ionic/react";
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
import IntroPop from "../popup/IntroPop";
import { useNavigate } from "react-router-dom";
import { Browser } from "@capacitor/browser";

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

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 카카오 콜백 처리 함수
  const handleKakaoCallback = async (code) => {
    try {
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
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

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

  // 완전 인앱 카카오 로그인
  const loginHandler = async () => {
    try {
      const REDIRECT_URI = encodeURIComponent(
        "https://app.bunout.info/oauth2/callback/kakao"
      );
      const KEY = "8a6e7b4b0b03c895fc6795146375d6ac";
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      if (isPlatform("mobile") || isPlatform("hybrid")) {
        // 모바일에서는 InAppBrowser 사용
        const browser = await Browser.open({
          url: link,
          windowName: "_self", // _blank -> _self로 변경
          toolbarColor: "#ffffff",
          showTitle: true,
          enableUrlBarHiding: false, // 주소 바 숨기기
          hideUrlBar: true, // 주소 바 숨기기
          hideToolbarNavigationButtons: false,
          presentationStyle: "fullscreen", // 전체화면으로 표시
        });

        // URL 변경 감지
        Browser.addListener("browserPageLoaded", async (info) => {
          console.log("Browser page loaded:", info.url);

          if (info.url.includes("app.bunout.info/oauth2/callback/kakao")) {
            const url = new URL(info.url);
            const code = url.searchParams.get("code");

            if (code) {
              console.log("Auth code received:", code);
              await browser.close(); // 해당 browser 인스턴스를 통해 브라우저를 종료합니다.
              handleKakaoCallback(code);
              Browser.removeListener("browserPageLoaded"); // 특정 리스너만 제거
            }
          }
        });

        // 브라우저 닫힘 감지
        Browser.addListener("browserFinished", () => {
          console.log("Browser closed");
          Browser.removeAllListeners();
        });
      } else {
        // 웹에서는 기존 방식
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
