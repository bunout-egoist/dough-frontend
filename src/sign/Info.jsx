import React, { useState } from "react";
import styles from "./sign.css";

export default function Info() {
    const [date, setDate] = useState("");
    const [isWarning, setIsWarning] = useState(false);

    const onInputHandler = (e) => {
        let val = e.target.value.replace(/\D/g, "");
        let leng = val.length;
        let result = '';

        if (leng < 6) result = val;
        else if (leng < 8) {
            result += val.substring(0, 4);
            result += "-";
            result += val.substring(4);
        } else {
            result += val.substring(0, 4);
            result += "-";
            result += val.substring(4, 6);
            result += "-";
            result += val.substring(6);

            if (!checkValidDate(result)) {
                setIsWarning(true);
            } else {
                setIsWarning(false);
            }
        }
        setDate(result);
    };

    const checkValidDate = (value) => {
        let result = true;
        try {
            let date = value.split("-");
            let y = parseInt(date[0], 10),
                m = parseInt(date[1], 10),
                d = parseInt(date[2], 10);

            let dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
            result = dateRegex.test(d + '-' + m + '-' + y);
        } catch (err) {
            result = false;
        }
        return result;
    }

    return (
        <div className="signpage sign-nickname-page">
            <div className="signpage-title">반가워요!<br /><span className="bold-txt">어떻게 불러드릴까요?</span></div>
            <div className="nickname-step1">
                <div>닉네임</div>
                <div>
                    <input placeholder="닉네임 입력하시오" />
                    <span>0/5</span>
                </div>
            </div>
            <div className="nickname-step2">
                <div>
                    <div>생년월일(8자리)</div>
                    <div className="date_wrap">
                        <input
                            placeholder="YYYY-MM-DD"
                            id="date"
                            maxLength="10"
                            value={date}
                            onChange={onInputHandler}
                        />
                    </div>
                    {isWarning && <span className="warning">유효하지 않은 날짜입니다.</span>}
                </div>
                <div>
                    <div>성별</div>
                    <div>
                        <input  className="input-box input-sex" placeholder="성별"/>
                        <img src="/images/toggle.png"/>
                    </div>
                </div>
                <div>
                    <div>직종</div>
                    <div>
                        <input className="input-box input-job" placeholder="직종"/>
                        <img src="/images/toggle.png"/>
                    </div>
                </div>
            </div>
            <div className="signpage-btn-area">
                <div className="signpage-btn">다음</div>
            </div>
        </div>
    );
}
