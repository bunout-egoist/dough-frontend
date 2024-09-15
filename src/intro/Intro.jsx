import React, { useState, useEffect } from "react";
import styles from "./intro.css";
import { isPlatform } from '@ionic/react';  // Import Capacitor's isPlatform utility
import { Device } from '@capacitor/device'; // Import Capacitor Device API
import AppleLogin from 'react-apple-login';
import { SignInWithApple } from '@capacitor-community/apple-sign-in';
import { Capacitor } from "@capacitor/core";
import { Link } from "react-router-dom";
export default function Intro() {
    const [isIos, setIsIos] = useState(false); // State to determine if the device is iOS

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
    }, []);

    const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao';
    const KEY = process.env.REACT_APP_K_REST_API;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
   
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
            const appleLoginUrl = `https://appleid.apple.com/auth/authorize?client_id=${APPLE_CLIENT_ID}&redirect_uri=${APPLE_REDIRECT_URI}&response_type=code%20id_token&scope=name%20email&response_mode=form_post`;
            window.location.href = appleLoginUrl;
            
        }
       
    };

    // useEffect(() => {
    //     // Handle redirection from Apple login
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const code = urlParams.get('code');
    //     const idToken = urlParams.get('id_token');

    //     if (code && idToken) {
    //         // Send code and idToken to server
    //         fetch('/api/v1/auth/login/apple', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 code,
    //                 id_token: idToken,
    //             }),
    //         })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log('Apple login response:', data);

    //             if (data.success) {
    //                 const jwtToken = data.data.jwtToken;
    //                 const refreshToken = data.data.refreshToken;
    //                 // Store tokens in local storage
    //                 localStorage.setItem('jwtToken', jwtToken);
    //                 localStorage.setItem('refreshToken', refreshToken);
    //                 // Redirect or handle successful login
    //                 window.location.href = '/'; // Example: navigate to home page
    //             } else {
    //                 console.error('로그인 중 오류 발생:', data.message);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('로그인 중 오류 발생:', error);
    //         });
    //     }
    // }, []);

    const [gifSrc, setGifSrc] = useState('/images/intro/onboard.gif');
    return (
        <div className="intropage">
            <div className="profile-img"> <img src={`${gifSrc}?${new Date().getTime()}`} alt="gif" className="img-width"/></div>
            <div className="into-bottom">
                <div className="intro-bottom-abs">
                    {/* Conditionally render Kakao and Apple buttons based on the platform */}
                    <div className="intropage-sns intropage-kakao">
                                <div className="intropage-kakao-img" onClick={loginHandler}>
                                    <img src="/images/intro/kakao.png" className="img-width" alt="Kakao Login"/>
                                </div>
                    </div>
                    {isIos ? (
                        <>
                            
                            <div className="intropage-sns intropage-apple">
                                <div className="intropage-kakao-img" onClick={handleAppleLogin}>
                                    <img src="/images/intro/apple.png" className="img-width" alt="Apple Login"/>
                                </div>
                            </div>
                        </>
                    ) : (
                      <span>

                      </span> 
                    )}
                    <Link to="/tutorial">
                    <div>서비스 둘러보기</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
