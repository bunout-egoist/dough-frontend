import React, { useState, useEffect } from "react";
import styles from "./intro.css"; // eslint-disable-next-line
import { isPlatform } from '@ionic/react';  // Import Capacitor's isPlatform utility
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
import AppleLogin from "react-apple-login";
export default function Intro() {
    const [isIos, setIsIos] = useState(false); // State to determine if the device is iOS
    const [showNextPage, setShowNextPage] = useState(false); // State to toggle between FirstPage and NextPage


    useEffect(() => {
        // Function to check if the current platform is iOS
        const checkPlatform = async () => {
            if (isPlatform('ios')) {
                setIsIos(true);
            } else if (isPlatform('android')) {
                setIsIos(false);
            } else {
                // Fallback: User-Agent based detection for web environments
                const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
                if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
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
    const REDIRECT_URI = 'https://app.bunout.info/oauth2/callback/kakao';  
    const KEY = process.env.REACT_APP_K_REST_API;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    console.log('Kakao Client ID:', KEY);
    const loginHandler = () => {
        window.location.href = link;
    };
  
    const handleAppleResponse = (response) => {
        console.log("Apple Login Response: ", response);
        // response.detail.authorization.id_token을 통해 idToken 확인 가능
        const idToken = response?.authorization?.id_token;
        console.log("ID Token: ", idToken);
    };
    // const loginWithApple = async (e) => {
    //     e.preventDefault();
    
    //     console.log('sign in with apple');
    
    //     // AppleID 초기화
    //     window.AppleID.auth.init({
    //       clientId: 'com.bunout.appServices', // Apple Developer에서 제공하는 clientId
    //       scope: '', // 예: 'name email'
    //       redirectURI: 'https://app.bunout.info/api/v1/auth/login/apple', // 리다이렉트될 URI
    //       usePopup: false, // 팝업으로 인증할지 여부
    //     });

    //     try {
    //       // Apple 로그인 요청
    //       const res = await window.AppleID.auth.signIn();
    //       console.log('Apple Login Response:', res);
    //       // 로그인 성공 시 처리 로직 추가
    //     } catch (error) {
    //       console.error('Apple Login Error:', error);
    //     }
    // };

    const [gifSrc, setGifSrc] = useState('/images/intro/onboard.gif');
    return (
        <div className="intropage">
             {!showNextPage ? (
                <FirstPage />
            ) : (
                <div className="nextpage">
                    <div className="profile-img">
                        <img src={`${gifSrc}?${new Date().getTime()}`} alt="gif" />
                    </div>
                    <div className="into-bottom">
                        <div className="intro-bottom-abs">
                            <div className="intropage-sns intropage-kakao" onClick={loginHandler}>
                                <div className="intropage-kakao-img" >
                                    <img src="/images/intro/kakao.png" className="img-width" alt="Kakao Login" />
                                </div>
                            </div>
                            {isIos ? (
                                <div className="intropage-sns intropage-apple" >
                                    <AppleLogin
                                        clientId="com.bunout.appServices"
                                        redirectURI="https://app.bunout.info/api/v1/auth/login/apple" 
                                        responseType="code id_token" // OAuth 2.0에서 사용할 응답 형식
                                        responseMode="form_post" // 서버로 전달할 방식 (post 요청으로 전달)
                                        usePopup={false} // 팝업 방식이 아닌 리디렉션 방식 사용
                                        onSuccess={handleAppleResponse} // 성공 시 실행될 함수
                                        onError={(error) => console.error('Apple Login Error: ', error)} // 에러 처리
                                        />
                                    {/* <div className="intropage-kakao-img" >
                                        <img src="/images/intro/apple.png" className="img-width" alt="Apple Login" />
                                    </div> */}
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
