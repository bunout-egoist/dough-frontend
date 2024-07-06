import React from "react";
import styles from "./type.css";
import About from "./About";
export default function TypePage(){
 return(
    <div className="typepage">
        <About />
        <div className="typepage-main">
            <div className="typepage-title">
                <img src="/images/intro/mytypetitle.png" alt="image" className="img-width"/>
            </div>
            <div className="type-select-area">
                <div className="type-box">
                    <img className="img-width" alt="image" src="/images/intro/type1.png"/>
                </div>
                <div className="type-box">
                    <img className="img-width" alt="image" src="/images/intro/type2.png"/>
                </div>
                <div className="type-box">
                    <img className="img-width" alt="image" src="/images/intro/type3.png"/>
                </div>
                <div className="type-box">
                    <img className="img-width" alt="image" src="/images/intro/type4.png"/>
                </div>
                <div className="type-box">
                    <img className="img-width" alt="image" src="/images/intro/type5.png"/>
                </div>
            </div>
            <div className="typepage-btn-area">
                <div className="typepage-btn">다음</div>
            </div>
        </div>
    </div>
 );   
}