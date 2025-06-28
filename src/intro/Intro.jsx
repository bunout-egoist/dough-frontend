import React, { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";
import { Browser } from "@capacitor/browser";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import IntroPop from "./IntroPop";
import FirstPage from "./FirstPage";
import "./intro.css";
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
      const response = await fetch("https://app.bunout.info/api/auth/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/main"); // 로그인 성공 후 메인 페이지로 이동
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const loginHandler = async () => {
    try {
      const REDIRECT_URI = "https://app.bunout.info/oauth2/callback/kakao"; // 리디렉션 URL
      const KEY = "8a6e7b4b0b03c895fc6795146375d6ac"; // 카카오 앱 JavaScript 키
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      // 모바일에서 인앱 브라우저로 로그인 페이지를 엽니다
      if (isPlatform("mobile")) {
        await Browser.open({
          url: link,
          windowName: "_self", // 기존 창에서 열도록 설정
          toolbarColor: "#000000",
          presentationStyle: "popover", // 팝업 형식
        });
      } else {
        // 웹에서는 기존 방식 사용 (Redirection.jsx로 리디렉션)
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
    }
  }

  const handlePopClose = () => {
    setNonAllow(false);
  };

  return (
    <div className="intropage">
      {nonAllow ? <IntroPop onClose={handlePopClose} /> : <div></div>}
      {!showNextPage ? (
        <FirstPage />
      ) : (
        <div className="nextpage">
          <div className="profile-img">
            <img src="/images/intro/onboard.gif" alt="gif" />
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
