import React, { useState, useEffect } from "react";
import styles from "./intro.css"; // eslint-disable-next-line
import { isPlatform } from "@ionic/react"; // Import Capacitor's isPlatform utility
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
import AppleLogin from "react-apple-login";
import IntroPop from "../popup/IntroPop";
import { useNavigate } from "react-router-dom";
export default function Intro() {
  const [isIos, setIsIos] = useState(false); // State to determine if the device is iOS
  const [showNextPage, setShowNextPage] = useState(false); // State to toggle between FirstPage and NextPage
  const [nonAllow, setNonAllow] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    requestCameraPermission();
    requestNotificationPermission();

    const checkPlatform = async () => {
      if (isPlatform("ios")) {
        setIsIos(true);
      } else if (isPlatform("android")) {
        setIsIos(false);
      } else {
        // Fallback: User-Agent 기반으로 macOS 및 iOS 환경을 구분
        const userAgent = window.navigator.userAgent || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          setIsIos(true);
        } else if (/Macintosh/.test(userAgent) && "ontouchend" in document) {
          // MacBook + 터치 스크린이 있는 경우 (iOS 환경을 모방)
          setIsIos(true);
        } else {
          setIsIos(false);
        }
      }
    };

    checkPlatform();
    // 페이징 이동
    const timer = setTimeout(() => {
      setShowNextPage(true);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao';
  const REDIRECT_URI = "https://app.bunout.info/oauth2/callback/kakao";
  const KEY = "8a6e7b4b0b03c895fc6795146375d6ac";
  //process.env.REACT_APP_KEY;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  console.log("Kakao Client ID:", KEY);
  const loginHandler = () => {
    window.location.href = link;
  };

  const handleAppleResponse = (response) => {
    console.log("Apple Login Response: ", response);
    // response.detail.authorization.id_token을 통해 idToken 확인 가능
    const idToken = response?.authorization?.id_token;
    console.log("ID Token: ", idToken);
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
  function requestNotificationPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notifications permission granted");
          setNonAllow(false);
        } else {
          alert("알림을 사용하려면 권한을 허용해주세요.");
          setNonAllow(true);
          console.log(nonAllow);
        }
      });
    }
  }

  const loginWithApple = async (e) => {
    e.preventDefault();

    console.log("sign in with apple");

    window.AppleID.auth.init({
      clientId: "com.bunout.appServices",
      redirectURI: "https://app.bunout.info/api/v1/auth/login/apple",
      state: "bunout",
      usePopup: true,
    });

    try {
      const res = await window.AppleID.auth.signIn();
      console.log(res);
      navigate("/redirect/apple", { state: { res } });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePopClose = () => {
    setNonAllow(false); // nonAllow를 false로 설정
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
              {isIos ? (
                <div
                  className="intropage-sns intropage-apple"
                  onClick={loginWithApple}
                >
                  {/* <AppleLogin
                                        clientId="com.bunout.appServices"
                                        redirectURI="https://app.bunout.info/api/v1/auth/login/apple" 
                                        responseType="code id_token" // OAuth 2.0에서 사용할 응답 형식
                                        responseMode="form_post" // 서버로 전달할 방식 (post 요청으로 전달)
                                        usePopup={false} // 팝업 방식이 아닌 리디렉션 방식 사용
                                        onSuccess={handleAppleResponse} // 성공 시 실행될 함수
                                        onError={(error) => console.error('Apple Login Error: ', error)} // 에러 처리
                                        /> */}
                  <div className="intropage-kakao-img">
                    <img
                      src="/images/intro/apple.png"
                      className="img-width"
                      alt="Apple Login"
                    />
                  </div>
                </div>
              ) : null}
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
