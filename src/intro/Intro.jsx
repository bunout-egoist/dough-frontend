import React, { useState, useEffect } from "react";
import styles from "./intro.css";
import { isPlatform } from '@ionic/react';  // Import Capacitor's isPlatform utility
import { Device } from '@capacitor/device'; // Import Capacitor Device API
import AppleLogin from 'react-apple-login';
import { SignInWithApple } from '@capacitor-community/apple-sign-in';
import { Capacitor } from "@capacitor/core";
import { Link } from "react-router-dom";
import FirstPage from "./FirstPage";
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

    // const REDIRECT_URI = Capacitor.isNativePlatform()
    // ? 'myapp://oauth2/callback/kakao' // 모바일 앱에서 사용되는 URI
    // : 'http://localhost:3000/oauth2/callback/kakao'; // 웹 환경에서 사용되는 URI
  
    const REDIRECT_URI = 'https://bunout-q3vpcf9ts-jaelims-projects.vercel.app/oauth2/callback/kakao';
    const KEY = process.env.REACT_APP_K_REST_API;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    console.log('Kakao Client ID:', KEY);
    const loginHandler = () => {
        window.location.href = link;
    };
    async function handleAppleLogin() {
        // window.location.href = `https://appleid.apple.com/auth/authorize?client_id=com.example.app&redirect_uri=${APPLE_REDIRECT_URI}&response_type=code id_token&scope=name email`;
        if (Capacitor.isNativePlatform()){
            try {
                const result = await SignInWithApple.authorize({
                  clientId: 'com.bunout.app', 
                  redirectURI: 'https://bunout.info/api/v1/auth/login/apple', // 모바일용 Redirect URI
                  scopes: 'name email',
                });
                // 로그인 성공 처리
                console.log(result);
              } catch (error) {
                // 로그인 실패 처리
                console.error(error);
              }
        } else{
            const APPLE_CLIENT_ID = 'com.bunout.appServices';
            const APPLE_REDIRECT_URI= encodeURIComponent('https://bunout.info/api/v1/auth/login/apple');
            const appleLoginUrl = `https://appleid.apple.com/auth/authorize?client_id=${APPLE_CLIENT_ID}&redirect_uri=${APPLE_REDIRECT_URI}&response_type=code&response_mode=post-form`;
            window.location.href = appleLoginUrl;
        }
       
    };
    const loginWithApple = async (e) => {
        e.preventDefault();
    
        console.log('sign in with apple');
    
        // AppleID 초기화
        window.AppleID.auth.init({
          clientId: 'com.bunout.appServices', // Apple Developer에서 제공하는 clientId
          scope: '', // 예: 'name email'
          redirectURI: 'https://bunout.info/api/v1/auth/login/apple', // 리다이렉트될 URI
          usePopup: false, // 팝업으로 인증할지 여부
        });
    
        try {
          // Apple 로그인 요청
          const res = await window.AppleID.auth.signIn();
          console.log('Apple Login Response:', res);
          // 로그인 성공 시 처리 로직 추가
        } catch (error) {
          console.error('Apple Login Error:', error);
        }
      };
      const appleResponse = (response) => {
        console.log("Apple Login Response:", response);
        // Apple 로그인 후 처리
    };

    const [gifSrc, setGifSrc] = useState('/images/intro/onboard.gif');
    return (
        <div className="intropage">
             {!showNextPage ? (
                <FirstPage />
            ) : (
                <div className="nextpage">
                    <div className="profile-img">
                        <img src={`${gifSrc}?${new Date().getTime()}`} alt="gif" className="img-width" />
                    </div>
                    <div className="into-bottom">
                        <div className="intro-bottom-abs">
                            <div className="intropage-sns intropage-kakao">
                                <div className="intropage-kakao-img" onClick={loginHandler}>
                                    <img src="/images/intro/kakao.png" className="img-width" alt="Kakao Login" />
                                </div>
                            </div>
                            {isIos ? (
                                <div className="intropage-sns intropage-apple">
                                    {/* <AppleLogin
                            clientId="com.bunout.appServices"
                            redirectURI="https://bunout.info/api/v1/auth/login/apple"
                            usePopup={false}
                            callback={appleResponse} // Catch the response
                            scope="email name"
                            responseMode="query"
                            render={renderProps => (  //Custom Apple Sign in Button
                                    <button
                                        onClick={renderProps.onClick}
                                            style={{
                                                backgroundColor: "white",
                                                padding: 10,
                                                border: "1px solid black",
                                                fontFamily: "none",
                                                lineHeight: "25px",
                                                fontSize: "25px"
                                                }}
                                        >
                                        <i className="fa-brands fa-apple px-2 "></i>
                                        Continue with Apple
                                    </button>
                    )}
                    />        */}
                    <div className="intropage-kakao-img" onClick={handleAppleLogin}>
                                        <img src="/images/intro/apple.png" className="img-width" alt="Apple Login" />
                                    </div>
                                </div>
                            ) : null}
                            <Link to="/tutorial">
                                <div>서비스 둘러보기</div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
