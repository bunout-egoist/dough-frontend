import React from "react";
import styles from "../tutorial.css";

export default function Chatbox({ currentKey, text, btnTxt, onNextChat }) {
    return (
        <div className="chatbox-area">
            <div className={`chatbox-area-abs chat-${currentKey}`}>
                <div className="skip-btn"><img src="/images/tutorial/skip.png"/></div>
                <div className="chatbox">
                    <div className="chatbox-txt" dangerouslySetInnerHTML={{ __html: text }} />
                    <div className="chatbox-flex">
                        <div className="chatbox-btn" onClick={onNextChat}>
                            {btnTxt}
                        </div>
                        <div className="chatbox-seq actor-regular">
                            {currentKey + 1}/11
                        </div>
                    </div>
                </div>
                <div className="pointer"></div>
            </div>
        </div>
    );
}
