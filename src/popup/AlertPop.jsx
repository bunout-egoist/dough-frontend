import React from "react";
import styles from "./pop.css";
export default function AlertPop() {
    return(
        <div className="popup-bg alert-pop">
            <div className="popup-box">
                <div className="popup-content">
                    알람 설정을 위해선,<br/>
                    기기 설정에서 알람 권한 허용 후에 다시 로그인 해주세요!<br/>
                    매일 미션 알람이 제공됩니다.
                </div>
                <div className="popup-btn" onClick={onClose}>확인</div>
            </div>
        </div>
    );
}