import React, { useState, useEffect } from "react";
import styles from "./intro.css"; // eslint-disable-next-line
import { isPlatform } from "@ionic/react";
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
import IntroPop from "../popup/IntroPop";
import { useNavigate } from "react-router-dom";

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

  // 카카오 로그인 핸들러 - 모든 플랫폼에서 동일한 웹 리다이렉트 사용
  const loginHandler = async () => {
    try {
      const REDIRECT_URI = encodeURIComponent(
        "https://app.bunout.info/oauth2/callback/kakao"
      );
      const KEY = "8a6e7b4b0b03c895fc6795146375d6ac";
      const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      // 모든 플랫폼(웹, 앱)에서 현재 웹뷰 내에서 직접 이동
      window.location.href = link;
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
