import React, { useState, useEffect } from "react";
import styles from "./intro.css"; // eslint-disable-next-line
import { isPlatform } from "@ionic/react";
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
// import AppleLogin from "react-apple-login";
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
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao';
  const REDIRECT_URI = "https://app.bunout.info/oauth2/callback/kakao";
  //process.env.REACT_APP_KEY;
  const KEY = "8a6e7b4b0b03c895fc6795146375d6ac";
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = link;
  };

  // const handleAppleResponse = (response) => {
  //   console.log("Apple Login Response: ", response);
  //   // response.detail.authorization.id_token을 통해 idToken 확인 가능
  //   const idToken = response?.authorization?.id_token;
  //   console.log("ID Token: ", idToken);
  // };

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

  // const loginWithApple = async (e) => {
  //   e.preventDefault();

  //   console.log("sign in with apple");

  //   window.AppleID.auth.init({
  //     clientId: "com.bunout.appServices",
  //     redirectURI: "https://app.bunout.info/api/v1/auth/login/apple",
  //     state: "bunout",
  //     usePopup: true,
  //   });

  //   try {
  //     const res = await window.AppleID.auth.signIn();
  //     console.log(res);
  //     navigate("/redirect/apple", { state: { res } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
              {/* {isIos ? (
                <div
                  className="intropage-sns intropage-apple"
                  onClick={loginWithApple}
                >
                  <div className="intropage-kakao-img">
                    <img
                      src="/images/intro/apple.png"
                      className="img-width"
                      alt="Apple Login"
                    />
                  </div>
                </div>
              ) : null} */}
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
