import React from "react";
import styles from "./navbar.css";
import { Link, useLocation } from 'react-router-dom';
export default function Navbar() {
    const location = useLocation(); // 현재 위치를 얻음

    return(
        <div className="navbar-area">
            <Link to= "/dashpage">
                <div className="navbar-icon dashpage-icon">
                    <img src={(location.pathname === "/dashpage" || location.pathname.startsWith('/detail/')) 
                            ? "/images/navbarImage/chart.png" 
                            : "/images/navbarImage/default-chart.png"}  alt="이미지" className="img-width"/>
                </div>
            </Link>
            <Link to="/main">
                <div className="navbar-icon main-icon">
                    <img src={location.pathname === "/main" 
                            ? "/images/navbarImage/home.png" 
                            : "/images/navbarImage/default-home.png"} alt="이미지" className="img-width"/>
                </div>
            </Link>
            <Link to="/setting">
                <div className="navbar-icon setting-icon">
                    <img src={location.pathname === "/setting" 
                            ? "/images/navbarImage/setting.png" 
                            : "/images/navbarImage/default-setting.png"} alt="이미지" className="img-width"/>
                </div>
            </Link>
        </div>
    );
}