import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PushNotifications } from '@capacitor/push-notifications'; // Capacitor Push Notifications import
import Sign from "../sign/Sign";

export default function Redirection() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isNewMember, setIsNewMember] = useState(null);
  const logincode = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  // 알림 권한 요청 및 FCM 토큰 가져오기
  const requestPushNotificationPermission = async () => {
    try {
      const permissionStatus = await PushNotifications.requestPermissions();
      if (permissionStatus.receive === 'granted') {
        console.log("알림 권한이 허용되었습니다.");

        // Push 알림 등록
        await PushNotifications.register();

        // 토큰 수신
        PushNotifications.addListener('registration', (token) => {
          console.log('FCM 토큰:', token.value);
          // 서버로 FCM 토큰 전달하기 위해 반환
          return token.value;
        });

        // 알림 수신 이벤트 핸들러 설정
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('푸시 알림 수신:', notification);
        });

        // 푸시 알림 클릭 핸들러 설정
        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
          console.log('푸시 알림 클릭:', notification);
        });

      } else {
        console.log("알림 권한이 허용되지 않았습니다.");
      }
    } catch (error) {
      console.error("알림 권한 요청 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (logincode) {
      const getAndSendToken = async () => {
        try {
          console.log('들어옴');
          // 알림 권한 요청 및 FCM 토큰 수신
          let fcmToken = await requestPushNotificationPermission();

          if (!fcmToken) {
            console.log("FCM 토큰이 없습니다.");
            alert('알림을 허용하지 않았습니다. 어플 설정에서 알림 권한을 확인하세요.');
            return;
          }

          console.log(fcmToken, '토큰 존재');
          
          // 서버로 로그인 요청 전송 (fcmToken이 없으면 null로 전송)
          fetch(`/api/v1/auth/login/kakao?code=${logincode}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "fcmToken": fcmToken || null,
            }),
            credentials: 'include',
          })
          .then((response) => {
            console.log("Response status:", response.status);
            if (response.status === 200) {
              setLoginSuccess(true);
            }
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log("Received data:", data, data.isNewMember);
            const accessToken = data.accessToken;
            const refreshToken = data.refreshToken;

            // Store tokens in local storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setLoginSuccess(true); 
            setIsNewMember(data.isNewMember);
          })
          .catch((error) => {
            console.error('로그인 중 오류 발생:', error);
          });

        } catch (error) {
          console.error('Error getting FCM token:', error);
        }
      };

      getAndSendToken();
    }
  }, [logincode]);

  useEffect(() => {
    if (loginSuccess && isNewMember !== null) { // 로그인 성공 여부와 isNewMember가 업데이트된 후에 네비게이션 처리
      console.log('Navigating based on login success and new member status');
      if (isNewMember === true) {
        navigate("/sign");
      } else {
        navigate("/main");
      }
    }
  }, [loginSuccess, isNewMember, navigate]);

  return (
    <div>
      {loginSuccess ? "로그인 성공" : "로그인 중..."}
    </div>
  );
}
