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
  const [showKakaoPopup, setShowKakaoPopup] = useState(false);
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

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = async (authCode) => {
    try {
      const response = await fetch("https://app.bunout.info/api/auth/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setShowKakaoPopup(false);
        navigate("/main");
      } else {
        throw new Error(data.message || "로그인 실패");
      }
    } catch (error) {
      console.error("Kakao login error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      setShowKakaoPopup(false);
    }
  };

  // 수정된 loginHandler - 팝업으로 변경
  const loginHandler = () => {
    setShowKakaoPopup(true);
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

      {/* 카카오 로그인 팝업 */}
      {showKakaoPopup && (
        <KakaoLoginPopup
          onSuccess={handleKakaoLogin}
          onClose={() => setShowKakaoPopup(false)}
        />
      )}

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

// 카카오 로그인 팝업 컴포넌트
const KakaoLoginPopup = ({ onSuccess, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 카카오 SDK 로드
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("8a6e7b4b0b03c895fc6795146375d6ac");
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    setIsLoading(true);

    // 팝업 방식으로 로그인
    window.Kakao.Auth.login({
      success: function (response) {
        console.log("카카오 로그인 성공:", response);

        // 사용자 정보 가져오기
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (userResponse) {
            console.log("사용자 정보:", userResponse);

            // 서버에 토큰 전송 또는 직접 처리
            // access_token을 서버로 보내거나
            // 여기서 직접 처리할 수 있습니다
            handleServerLogin(response.access_token, userResponse);
          },
          fail: function (error) {
            console.error("사용자 정보 가져오기 실패:", error);
            setIsLoading(false);
            alert("사용자 정보를 가져오는데 실패했습니다.");
          },
        });
      },
      fail: function (error) {
        console.error("카카오 로그인 실패:", error);
        setIsLoading(false);
        alert("로그인에 실패했습니다.");
      },
    });
  };

  // 서버에 로그인 정보 전송
  const handleServerLogin = async (accessToken, userInfo) => {
    try {
      const response = await fetch(
        "https://app.bunout.info/api/auth/kakao-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: accessToken,
            user_info: userInfo,
          }),
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (data.success) {
        onSuccess(data.token || accessToken);
      } else {
        throw new Error(data.message || "서버 로그인 실패");
      }
    } catch (error) {
      console.error("서버 로그인 에러:", error);
      setIsLoading(false);
      alert("로그인 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <div style={popupStyles.header}>
          <h3>카카오 로그인</h3>
          <button onClick={onClose} style={popupStyles.closeBtn}>
            ×
          </button>
        </div>

        <div style={popupStyles.content}>
          <img
            src="/images/intro/kakao.png"
            alt="카카오"
            style={popupStyles.kakaoLogo}
          />
          <p>카카오 계정으로 간편하게 로그인하세요</p>

          <button
            onClick={handleKakaoLogin}
            disabled={isLoading}
            style={{
              ...popupStyles.loginBtn,
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "로그인 중..." : "카카오 로그인"}
          </button>
        </div>
      </div>
    </div>
  );
};

// 팝업 스타일
const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  popup: {
    backgroundColor: "white",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    maxHeight: "80%",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f8f9fa",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
  },
  content: {
    padding: "24px 20px",
    textAlign: "center",
  },
  kakaoLogo: {
    width: "60px",
    height: "60px",
    marginBottom: "16px",
  },
  loginBtn: {
    backgroundColor: "#FEE500",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    marginTop: "16px",
  },
};
