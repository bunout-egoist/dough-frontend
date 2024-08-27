import React, { useState } from "react";
import styles from "./tutorial.css";
import Chatbox from "./components/Chatbox";
import MainBg from "./components/MainBg";
import Navbar from './../navbar/Navbar';
import DashPage from './../dashpage/DashPage';
import Finish from "./components/FInish";
export default function Tutorial() {
    const [chatKey, setChatKey] = useState(0);

    const chatContents = [
        { id: 1, text: ` 환영합니다. ###님!<br/>지금부터 Bunout을 함께 둘러보아요. <br/>모두 마치는데 <span className="chatbox-orange">3분</span>이 소요돼요.<br/>`, btnTxt: '둘러보기' },
        { id: 2, text: ` 매일의 퀘스트에 대한 요약 정보를<br/>여기에서 확인하실 수 있어요.<br/><br/>매일의 퀘스트는 자정마다 갱신됩니다.`, btnTxt: '둘러보기' },
        { id: 3, text: ` 매일 ###님에게 제공되는 데일리 퀘스트예요.<br/>데일리 퀘스트는 <span className="chatbox-orange">고정퀘스트</span>와<br/> <span className="chatbox-orange">유형별퀘스트</span>로 구성되어있어요`, btnTxt: '둘러보기' },
        { id: 4, text: ` 지금 바로 하나 해볼까요? 하늘을 10초 동안 바라봐주세요!`, btnTxt: '바라봤어요' },
        { id: 5, text: ` 어때요? 생각이 조금 가라앉으셨나요?<br/>그럼 수행한 퀘스트를 클릭해주세요!`, btnTxt: '다음' },
        { id: 6, text: ` 퀘스트 수행 후 <span className="chatbox-orange">난이도 평가</span>할 수 있어요.<br/>좌우 스크롤을 통해 5점 척도로 기록할 수 있답니다.<br/><br/><br/><span className="chatbox-orange">사진을 등록</span>하시면, 대시보드에서 모아볼 수 있어요!`, btnTxt: '다음' },
        { id: 7, text: ` 와 첫번째 퀘스트를 성공했어요! 🎉<br/>매번 퀘스트를 완수하면, 레벨이 올라가요!<br/><br/>`, btnTxt: '다음' },
        { id: 8, text: ` 오 이게 뭐죠? 새로운 퀘스트가 생겼어요.<br/> 기분 전환을 도와줄 스페셜 퀘스트예요.`, btnTxt: '다음' },
        { id: 9, text: ` 스페셜 퀘스트를 수행하면, 레벨도 금방 오른답니다! <br/>스페셜 퀘스트는 월, 수, 토요일에만 확인할 수 있어요.`, btnTxt: '다음' },
        { id: 10, text: ` 대시보드 화면에서는 이때까지 완료한 미션 현황과 등록했던 사진을 모아볼 수 있어요.`, btnTxt: '다음' },
        { id: 11, text: ` 달력 속 날짜를 클릭하면, 그 주의 기록을 확인할 수도 있습니다.`, btnTxt: '다음' },
        { id: 12, text: ``, btnTxt: '다음' },
    ];

    const handleNextChat = () => {
        setChatKey((prevKey) => (prevKey < chatContents.length - 1 ? prevKey + 1 : prevKey));
    };

    const bgImage = `/images/tutorial/${chatKey + 1}.png`;

    return (
        <div className="tutorial-page">
            <div className="tutorial-bg-area">
                {/* Conditional Rendering: Use Calendar if chatKey is 11 or more, otherwise use MainBg */}
                {chatKey < 10 ? <MainBg /> : <DashPage />}
                <Navbar />
            </div>
            <div className="tutorial-cover-area">
                {chatKey < 11 ? (
                    <div className="pos-rel">
                        <div className={`tutorial-img tutorial-img-${chatKey + 1}`}>
                        <img src={bgImage} className="img-width" />
                        </div>
                        <Chatbox
                        key={chatContents[chatKey].id}
                        text={chatContents[chatKey].text}
                        btnTxt={chatContents[chatKey].btnTxt}
                        onNextChat={handleNextChat}
                        currentKey={chatKey}
                        />
                    </div>
                ) : (
                    <Finish /> // Render Finish component when chatKey is 11
                )}
            </div>
        </div>
    );
}
