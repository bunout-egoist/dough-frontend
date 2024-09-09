import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MainLevel() {
    const [contents, setContents] = useState(null);

    useEffect(() => {
        fetch(`/api/v1/members/attendance`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtYW51bmE1MzBAZ21haWwuY29tIiwiaWF0IjoxNzI1NDczMjY1LCJleHAiOjE5ODQ2NzMyNjUsInN1YiI6ImdvZXVuQGdtYWlsLmNvbSIsImlkIjoxfQ.YGjMrp0ECN0CGlTATVtGffnr6lf8fiodQ698_AmY9HE',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setContents(data);  // 상태 업데이트
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // 빈 배열로 useEffect가 첫 렌더 시 한 번만 실행됨

    return (
        <div className="main-levelpage">
            <Link to="/">
                <div className="backbtn">
                    <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.91201 10.0001L10.262 17.3501C10.512 17.6001 10.6328 17.8918 10.6245 18.2251C10.6162 18.5584 10.487 18.8501 10.237 19.1001C9.98701 19.3501 9.69534 19.4751 9.36201 19.4751C9.02868 19.4751 8.73701 19.3501 8.48701 19.1001L0.787012 11.4251C0.587012 11.2251 0.437012 11.0001 0.337012 10.7501C0.237012 10.5001 0.187012 10.2501 0.187012 10.0001C0.187012 9.75011 0.237012 9.50011 0.337012 9.25011C0.437012 9.00011 0.587012 8.77511 0.787012 8.57511L8.48701 0.87511C8.73701 0.62511 9.03285 0.504277 9.37451 0.51261C9.71618 0.520944 10.012 0.65011 10.262 0.90011C10.512 1.15011 10.637 1.44178 10.637 1.77511C10.637 2.10844 10.512 2.40011 10.262 2.65011L2.91201 10.0001Z" fill="#8C96A4" />
                    </svg>
                </div>
            </Link>
            <div className="main-levelpage-top">
                <div className="level-top-title">
                    <div className="level-top-title-1">소보로 ##님</div>
                    <div className="level-top-title-2">멘탈 관리 중...</div>
                </div>
                <div className="level-top-img"><img className="img-width" src="/images/main/main_icon.png" /></div>
                <div className="main-levelpage-level">
                    <div className="level-value">400/500</div>
                    <div className="outer">
                        <div className="inner"></div>
                    </div>
                    <div className="level-change">
                        <div className="level-tag">레벨2</div>
                        <div className="level-tag">레벨3</div>
                    </div>
                </div>
            </div>
            <div className="main-level-bottom">
                <div><img src="/images/main/level/day1.png" className="img-width" /></div>
            </div>
        </div>
    );
}
