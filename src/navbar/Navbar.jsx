import React from "react";
import styles from "./navbar.css";
import { Link } from 'react-router-dom';
export default function Navbar() {
    return(
        <div className="navbar-area">
            <Link to= "/dashpage">
                <div className="navbar-icon">
                    <img src="/images/navbarImage/chart.png" alt="이미지" className="img-width"/>
                </div>
            </Link>
            <Link to="/main">
                <div className="navbar-icon">
                    <img src="/images/navbarImage/home.png" alt="이미지" className="img-width"/>
                </div>
            </Link>
            <Link to="/setting">
                <div className="navbar-icon">
                    <img src="/images/navbarImage/setting.png" alt="이미지" className="img-width"/>
                </div>
            </Link>
        </div>
    );
}