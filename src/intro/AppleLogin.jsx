import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppleLogin = () => {
    const navigate = useNavigate();
    const APPLE_CLIENT_ID = 'com.bunout.appServices';
    const APPLE_REDIRECT_URI= encodeURIComponent('https://bunout.info/api/v1/auth/login/apple');
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');
        const idToken = urlParams.get('id_token');

        if (authorizationCode && idToken) {
            console.log('Authorization Code:', authorizationCode);
            console.log('ID Token:', idToken);

            // 서버로 전달
            fetch('/api/v1/auth/login/apple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: authorizationCode,
                    idToken: idToken
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Server Response:', data);
                // 성공적인 로그인 후 페이지 이동
                navigate('/home');
            })
            .catch(error => console.error('Error:', error));
        }
    }, [navigate]);

    return (
        <div>
            <h1>Apple Login Page</h1>
            {/* 로그인 후 처리 로직 */}
        </div>
    );
};

export default AppleLogin;
