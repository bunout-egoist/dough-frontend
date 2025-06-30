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

  // 안드로이드 완전 인앱 카카오 로그인
  const loginHandler = async () => {
    try {
      const REDIRECT_URI = encodeURIComponent(
        "https://app.bunout.info/oauth2/callback/kakao"
      );
      const KEY = "8a6e7b4b0b03c895fc6795146375d6ac";
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      if (
        isPlatform("android") ||
        isPlatform("mobile") ||
        isPlatform("hybrid")
      ) {
        // 안드로이드 전용 완전 인앱 브라우저 설정
        const browser = await Browser.open({
          url: link,
          windowName: "_blank",
          toolbarColor: "#ffffff",
          showTitle: false, // 제목 표시 안함
          enableUrlBarHiding: true, // URL 바 숨기기 활성화
          hideUrlBar: true, // URL 바 완전 숨김
          hideToolbarNavigationButtons: false, // 뒤로가기 버튼은 유지
          presentationStyle: "fullscreen", // 전체화면
          // 안드로이드 전용 옵션들
          showToolbar: false, // 툴바 완전 숨김
          clearCache: false,
          clearSessionCache: false,
          hardwareBack: true, // 하드웨어 뒤로가기 버튼 활성화
          mediaPlaybackRequiresUserAction: false,
          shouldPauseOnSuspend: false,
          closeButtomText: "닫기",
          // 추가 안드로이드 설정
          androidShowTitle: false,
          androidShowLocation: false, // 주소창 완전 숨김
          androidCloseButtonText: "닫기",
        });

        // 모든 기존 리스너 제거
        Browser.removeAllListeners();

        // URL 변경 감지 리스너
        const urlChangeListener = Browser.addListener(
          "browserPageLoaded",
          async (info) => {
            console.log("Browser page loaded:", info.url);

            // 콜백 URL 감지
            if (
              info.url &&
              info.url.includes("app.bunout.info/oauth2/callback/kakao")
            ) {
              try {
                const url = new URL(info.url);
                const code = url.searchParams.get("code");

                if (code) {
                  console.log("Auth code received:", code);
                  // 브라우저 닫기
                  await Browser.close();
                  // 리스너 제거
                  urlChangeListener.remove();
                  // 콜백 처리
                  await handleKakaoCallback(code);
                }
              } catch (error) {
                console.error("URL parsing error:", error);
                await Browser.close();
                urlChangeListener.remove();
              }
            }
          }
        );

        // 브라우저 종료 감지
        const finishListener = Browser.addListener("browserFinished", () => {
          console.log("Browser closed by user");
          urlChangeListener.remove();
          finishListener.remove();
        });

        // 앱이 포그라운드로 돌아올 때 감지 (추가 안전장치)
        const appStateListener = App.addListener(
          "appStateChange",
          ({ isActive }) => {
            if (isActive) {
              console.log("App became active");
              // 필요시 여기서 추가 처리
            }
          }
        );

        // 에러 발생시 리스너 정리
        setTimeout(() => {
          // 30초 후 자동 정리 (타임아웃)
          urlChangeListener.remove();
          finishListener.remove();
          if (appStateListener) appStateListener.remove();
        }, 30000);
      } else {
        // 웹에서는 기존 방식
        window.location.href = link;
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      // 에러 발생시 모든 리스너 정리
      Browser.removeAllListeners();
    }
  };

  async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera access granted");
      setNonAllow(false);
      // 스트림 정리
      stream.getTracks().forEach((track) => track.stop());
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
