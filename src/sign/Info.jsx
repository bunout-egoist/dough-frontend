import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import styles from "./sign.css";

export default function Info() {
    const [date, setDate] = useState("");
    const [nickname, setNickname] = useState("");
    const [gender, setGender] = useState("select");
    const [job, setJob] = useState("select");
    const [isWarning, setIsWarning] = useState(false);
    const [step, setStep] = useState(1); // 1 for nickname-step1, 2 for nickname-step2
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to control button activation

    const navigate = useNavigate(); // Initialize useNavigate

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

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        
        // Validate nickname length
        if (value.length > 5) {
            alert('닉네임은 5자 이하로 적어주세요');
            setNickname(""); // Clear the input if more than 5 characters
            setIsButtonEnabled(false);
        } else {
            setNickname(value);
            setIsButtonEnabled(value.length >= 1); // Enable button if length is 1 or more
        }
    };
    

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value);

        // Check if the date is valid
        if (checkValidDate(value)) {
            setIsWarning(false);
            validateStep2Inputs(value, gender, job);
        } else {
            setIsWarning(true);
            setIsButtonEnabled(false);
        }
    };

    const handleGenderChange = (e) => {
        const value = e.target.value;
        setGender(value);
        validateStep2Inputs(date, value, job);
    };

    const handleJobChange = (e) => {
        const value = e.target.value;
        setJob(value);
        validateStep2Inputs(date, gender, value);
    };

    const validateStep2Inputs = (date, gender, job) => {
        // Enable the button only if all fields are filled and valid
        if (checkValidDate(date) && gender !== "select" && job !== "select") {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    };

    const handleButtonClick = () => {
        if (step === 1) {
            setStep(2);
            setIsButtonEnabled(false);
        } else if (step === 2) {
            // Log the date, gender, and job
         
            const infoData = {
                "nickname" :  nickname,
                "gender" : gender,
                "birthYear" : date,
                "occupation" : job,
                "fixedQuestId" : 1,
                "burnoutId" : 1
          }
            console.log(infoData);
            navigate("/typepage", { state: { infoData } });
        }
    };

    return (
        <div className="signpage sign-nickname-page">
            <div className="signpage-title">반가워요!<br /><span className="bold-txt">어떻게 불러드릴까요?</span></div>
            {step === 1 && (
                <div className="nickname-step1">
                    <div className="input-label">닉네임</div>
                    <div className="step1-input-flex step2-date-input">
                        <input
                            className="step1-date-input"
                            placeholder="닉네임 입력하시오"
                            value={nickname}
                            onChange={handleNicknameChange}
                        />
                        <span className="step1-input-cnt">{nickname.length}/5</span>
                    </div>
                </div>
            )}
            {step === 2 && (
                <div className="nickname-step2">
                    <div className="nickname-step2-input">
                        <div className="input-label">생년월일(8자리)</div>
                        <div className="date_wrap">
                            <input
                                className="step2-date-input"
                                id="date"
                                maxLength="10"
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div>
                        {isWarning && <span className="warning">유효하지 않은 날짜입니다.</span>}
                    </div>
                    <div className="nickname-step2-input">
                        <div className="input-label">성별</div>
                        <div className="input-box">
                            <select name="select-sex" className="step2-date-input" value={gender} onChange={handleGenderChange}>
                                <option value="select">성별 선택</option>
                                <option value="male">남성</option>
                                <option value="female">여성</option>
                                <option value="none-sex">선택안함</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="input-label">직종</div>
                        <div className="input-box">
                            <select name="select-job" className="step2-date-input" value={job} onChange={handleJobChange}>
                                <option value="select">직종 선택</option>
                                <option value="job1">학생(초/중/고)</option>
                                <option value="job2">대학생</option>
                                <option value="job3">직장인 2년차 이하</option>
                                <option value="job4">직장인 3년차 이상</option>
                                <option value="job5">선택안함</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
            <div className="signpage-btn-area">
                <div
                    className={`signpage-btn ${isButtonEnabled ? 'active' : 'inactive'}`}
                    onClick={isButtonEnabled ? handleButtonClick : null}
                    style={{ cursor: isButtonEnabled ? 'pointer' : 'not-allowed' }}
                >
                    {step === 1 ? "다음" : "제출"}
                </div>
            </div>
        </div>
    );
}
