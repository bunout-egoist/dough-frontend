import React, { useEffect } from "react";
import styles from "./type.css";

export default function About({ onSelect, type, isVisible, setIsVisible }) {
    useEffect(() => {
        setIsVisible(true);
    }, [type]);

    const handleClose = () => {
        setIsVisible(false);
        onSelect(0);
    };

    const handleSelect = () => {
        onSelect(type);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="aboutpage">
            <div className="aboutpage-main">
                <div className="aboutpage-close" onClick={handleClose}>
                    <img src="/images/type/x.png" alt="close" className="img-width" />
                </div>
                <div className="aboutpage-detail">
                    <div className="about-title">
                        <img src={`/images/type/type${type}_title.png`} className="img-width" alt="title" />
                    </div>
                    <div className="about-icon">
                        <img src={`/images/type/type${type}_icon.png`} className="img-width" alt="icon" />
                    </div>
                    <div className="about-txt">
                        <img src={`/images/type/about_type${type}.png`} className="img-width" alt="description" />
                    </div>
                </div>
                <div className="aboutpage-btn-area">
                    <div className="aboutpage-btn" onClick={handleSelect}>
                        선택하기
                    </div>
                </div>
            </div>
        </div>
    );
}
