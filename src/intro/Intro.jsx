import React, { useState, useEffect } from "react";
import styles from "./intro.css";
import { isPlatform } from '@ionic/react';  // Import Capacitor's isPlatform utility
import { Device } from '@capacitor/device'; // Import Capacitor Device API
import AppleLogin from 'react-apple-login';

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

    const REST_API_KEY = '3abc01eba80718573dbc9e7098b54ee1';
    const REDIRECT_URI = 'http://localhost:3000/oauth2/callback/kakao';
    const APPLE_REDIRECT_URI = 'http://localhost:3000/oauth2/callback/apple';
    
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
   
    const loginHandler = () => {
        window.location.href = link;
    };
    const handleAppleLogin = () => {
        window.location.href = `https://appleid.apple.com/auth/authorize?client_id=com.example.app&redirect_uri=${APPLE_REDIRECT_URI}&response_type=code id_token&scope=name email`;
    };

    useEffect(() => {
        // Handle redirection from Apple login
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const idToken = urlParams.get('id_token');

        if (code && idToken) {
            // Send code and idToken to server
            fetch('/api/v1/auth/login/apple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                    id_token: idToken,
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Apple login response:', data);

                if (data.success) {
                    const jwtToken = data.data.jwtToken;
                    const refreshToken = data.data.refreshToken;
                    // Store tokens in local storage
                    localStorage.setItem('jwtToken', jwtToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    // Redirect or handle successful login
                    window.location.href = '/'; // Example: navigate to home page
                } else {
                    console.error('로그인 중 오류 발생:', data.message);
                }
            })
            .catch((error) => {
                console.error('로그인 중 오류 발생:', error);
            });
        }
    }, []);


    return (
        <div className="intropage">
            <div className="intropage-title">DOUGH</div>
            <div>블라블라</div>
            <div className="profile-img"><img src="/images/type/type1_icon.png" className="img-width"/></div>
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
                    <div>서비스 둘러보기</div>
                </div>
            </div>
        </div>
    );
}
