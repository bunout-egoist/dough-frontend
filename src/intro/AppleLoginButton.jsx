import React from 'react';
import AppleLogin from 'react-apple-login';

const APPLE_CLIENT_ID = 'com.bunout.appServices'; // 애플에서 발급받은 클라이언트 ID
const APPLE_REDIRECT_URI = 'https://bunout.info/api/v1/auth/login/apple'; // 리디렉션 URI

const AppleLoginButton = () => {
    const handleSuccess = (response) => {
        console.log('Apple login success:', response);
        // 서버로 전달하기 위한 추가 작업
        fetch('/api/v1/auth/login/apple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: response.code,
                idToken: response.id_token
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server Response:', data);
            // 성공적인 로그인 후 페이지 이동
            window.location.href = '/home';
        })
        .catch(error => console.error('Error:', error));
    };

    const handleError = (error) => {
        console.error('Apple login error:', error);
    };

    return (
        <AppleLogin
            clientId={APPLE_CLIENT_ID}
            redirectURI={APPLE_REDIRECT_URI}
            responseType="code id_token"
            scope="name email"
            responseMode="query"
            usePopup={false}
            onSuccess={handleSuccess}
            onError={handleError}
        />
    );
};

export default AppleLoginButton;
