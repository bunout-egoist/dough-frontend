import React from "react";
import MissionCard from "./components/MissionCard";

export default class DetailPage extends React.Component {
    constructor(props) {
        super(props);

        const path = window.location.pathname; // 전체 URL 경로
        const day = path.split("/").pop(); 
        const datdate = day.slice(0, -3);
        const weekday = day.slice(-3);
        const weekdayKorIndex = {
            Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6
        }[weekday];

        const year = parseInt(`20${datdate.slice(0, 2)}`, 10); // '24' => 2024년
        const month = parseInt(datdate.slice(2, 4), 10) - 1; // '08' => 7월 (Date 객체에서 월은 0부터 시작)
        const dayOfMonth = parseInt(datdate.slice(4, 6), 10); // '01' => 1일

        this.state = {
            baseDate: new Date(year, month, dayOfMonth),
            baseWeekday: weekdayKorIndex,
            data: [], // fetch로 가져올 데이터를 저장할 배열
            selectedData: null, // 현재 선택된 날짜의 데이터를 저장
            accessToken: null // 토큰을 저장할 상태 추가
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('accessToken');
        if (token) {
            this.setState({ accessToken: token }, () => {
                console.log('토큰 잘 받음');
                this.fetchWeeklyData();
              });
        } else {
          console.error("Access token is not available");
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.baseDate !== this.state.baseDate) {
            this.fetchWeeklyData(); // baseDate가 변경되면 데이터를 다시 fetch
        }
    }

    handleDayClick = (offset) => {
        const newBaseDate = new Date(this.state.baseDate);
        newBaseDate.setDate(this.state.baseDate.getDate() + offset);

        this.setState({
            baseDate: newBaseDate,
            baseWeekday: (this.state.baseWeekday + offset + 7) % 7 // 요일이 순환하도록
        });
    };

    getDayWithOffset = (offset) => {
        const weekName = ['월', '화', '수', '목', '금', '토', '일'];
        const index = (this.state.baseWeekday + offset + 7) % 7;
        return weekName[index];
    };

    getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    fetchWeeklyData() {
        const {accessToken} =this.state;
        const formattedDate = this.getFormattedDate(this.state.baseDate);

        fetch(`/api/v1/dashboard/weekly/${formattedDate}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
            if (response.status === 401) {
              console.log('다시 발급2');
                this.refreshAccessToken();
            } else {
                return response.json();
            }
        })
        .then(data => {
            // 수행 퀘스트 데이터 배열을 state에 저장
            this.setState({ data }, () => {
                this.updateSelectedData(); // 데이터가 업데이트된 후 현재 선택된 날짜의 데이터를 갱신
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    refreshAccessToken () {
        const {accessToken} =this.state;
        const refreshToken = localStorage.getItem('refreshToken');
        fetch('/api/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${accessToken}`,
                'RefreshToken' :`Bearer ${refreshToken}`
              },
          
        })
        .then(response => {
            if (response.status === 401) {
              console.log('다시 발급2');
                this.refreshAccessToken();
            } else {
                return response.json();
            }
        })
        .then(data => {
            console.log('응답?',data);
            if (data.accessToken) {
                // Store new access token and retry fetching today's quests
                localStorage.setItem('accessToken', data.accessToken);
                this.setState({ accessToken: data.accessToken });
                this.fetchWeeklyData(data.accessToken);  // Retry with new token
            } else {
                console.error('Failed to refresh access token');
            }
        })
        .catch(error => console.error('Error refreshing access token:', error));
      };
    
      updateSelectedData() {
        const formattedDate = this.getFormattedDate(this.state.baseDate);
        
        // data가 undefined가 아니고, 배열인지 확인
        if (Array.isArray(this.state.data)) {
            const selectedData = this.state.data.find(item => item.completedDate === formattedDate);
            this.setState({ selectedData });
        } else {
            console.error("수행한 퀘스트 정보 없음");
        }
    }
    

    render() {
        const { baseDate, selectedData, data } = this.state;
    
        return (
            <div className="detail-page page-area">
                <div className="detail-top">
                    <div className="top-title">주변 달성률</div>
                    <div className="this-week">
                        {[...Array(7)].map((_, i) => {
                            const offsetDate = new Date(baseDate);
                            offsetDate.setDate(baseDate.getDate() + (i - 3)); // 중심일을 기준으로 오프셋
                            const formattedDate = this.getFormattedDate(offsetDate); // 'YYYY-MM-DD' 형식
                            const isToday = i === 3; // today 클래스 부여 조건
    
                           // data가 유효한지 확인 후 find 호출
                        const matchingData = Array.isArray(data) ? data.find(item => item.completedDate === formattedDate) : null;
                        const dailyCount = matchingData ? matchingData.dailyCount : null;
    
                            return (
                                <div
                                    key={i}
                                    className={`this-week-day ${isToday ? 'today' : ''} ${formattedDate} ${dailyCount ? `daily-count-${dailyCount}` : ''}`} // dailyCount를 클래스에 추가
                                    onClick={() => this.handleDayClick(i - 3)}
                                >
                                    <div className="day-txt">{this.getDayWithOffset(i - 3)}</div>
                                    <div className="day-date">{formattedDate.slice(-2)}</div> {/* 날짜의 일만 표시 */}
                                </div>
                            );
                        })}
                    </div>
                </div>
    
                <div className="detail-bottom">
                    {/* 선택된 날짜의 데이터 출력 */}
                    {selectedData ? (
                        <div>
                            <div>
                                <ul>
                                    {selectedData.questDetails.map((quest, index) => (
                                        <li key={index}>
                                             <MissionCard pictureImg={quest.imageUrl} missionTitle={quest.activity} missionDetail={quest.description} missionTag={quest.questType} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                       <div className="no-mission-area">
                            <div className="no-mission-img">
                                <img src="/images/dashpage/no-mission.png" className="img-width" />
                            </div>
                        </div>
                    )}
                    

{/*                     
                    <MissionCard pictureState={0} />
                    <MissionCard pictureState={1} /> */}
                </div>
    
                {/* <div className="navbar-area">
                    <div className="navbar-icon">
                        <img src="/images/navbarImage/chart.png" alt="이미지" className="img-width" />
                    </div>
                    <div className="navbar-icon">
                        <img src="/images/navbarImage/home.png" alt="이미지" className="img-width" />
                    </div>
                    <div className="navbar-icon">
                        <img src="/images/navbarImage/setting.png" alt="이미지" className="img-width" />
                    </div>
                </div> */}
            </div>
        );
    }
    
}
