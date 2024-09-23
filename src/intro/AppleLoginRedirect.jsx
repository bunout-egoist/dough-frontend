import React, { useEffect } from "react";

const AppleLoginRedirect = () => {
    useEffect(() => {
        // URL에서 form-data 추출
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        const id_token = queryParams.get('id_token');

        // 백엔드 API로 데이터 전송
        const sendDataToBackend = async () => {
            const response = await fetch('/api/v1/auth/login/apple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, id_token }), // payload
            });

            if (response.ok) {
                // 성공적으로 전송된 경우 처리
                const data = await response.json();
                console.log('Response from backend:', data);
            } else {
                // 오류 처리
                console.error('Error sending data to backend:', response.statusText);
            }
        };

        if (code && id_token) {
            sendDataToBackend();
        }
    }, []);

    return (
        <div>
            {/* 로딩 중 표시할 수 있는 컴포넌트 */}
            <h1>Loading...</h1>
        </div>
    );
};

export default AppleLoginRedirect;
