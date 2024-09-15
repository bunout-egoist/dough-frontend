import React, { Component } from 'react';
import moment from 'moment';
import styles from './dash.css';
import { useNavigate } from 'react-router-dom';

class Calendar extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      month: moment(),
      selected: moment().startOf('day'),
      contents: null, // 초기 상태 설정
      averageCompletion :0,
      completedAllQuestsDateCount : 0,
      countDetails : [],
      accessToken: null // 토큰을 저장할 상태 추가
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.select = this.select.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.setState({ accessToken: token }, this.fetchMonthlyData); // 토큰을 상태에 저장하고 fetch 호출
      console.log('받음2', token);
    } else {
      console.error("Access token is not available");
    }
  }

  fetchMonthlyData() {
    const {accessToken} =this.state;
    const yearMonth = this.state.month.format('YYYY-MM');
    fetch(`/api/v1/dashboard/monthly/${yearMonth}`, {
      method: 'GET',
      // mode: 'no-cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          contents: data,
          
         });
        console.log(data);
        this.state.averageCompletion = data.averageCompletion;
        this.state.completedAllQuestsDateCount = data.completedAllQuestsDateCount;
        this.state.countDetails = data.countDetails

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  previous() {
    this.setState(
      prevState => ({ month: prevState.month.subtract(1, 'month') }),
      () => this.fetchMonthlyData() // 이전 달 데이터 가져오기
    );
  }

  next() {
    this.setState(
      prevState => ({ month: prevState.month.add(1, 'month') }),
      () => this.fetchMonthlyData() // 다음 달 데이터 가져오기
    );
  }

  select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone(),
    });

    const formattedDate = day.date.format('YYMMDDddd');
    console.log("Navigating to: ", `/detail/${formattedDate}`); // 디버깅 출력

    this.props.navigate(`/detail/${formattedDate}`);
  }

  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month.clone().startOf('month').add('w' - 1).day('Sunday');
    let count = 0;
    let monthIndex = date.month();

    while (!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={this.state.month}
          select={(day) => this.select(day)}
          selected={this.state.selected}
          contents={this.state.contents} // contents 전달
          countDetails={this.state.countDetails} // pass countDetails here
        />
      );

      date.add(1, 'w');
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  }


  
  renderMonthLabel() {
    return (
      <div>
        <div className="today-month">
          <div className="display-flex">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.previous}>
              <path d="M2.77773 10.0001L10.1277 17.3501C10.3777 17.6001 10.4986 17.8918 10.4902 18.2251C10.4819 18.5584 10.3527 18.8501 10.1027 19.1001C9.85273 19.3501 9.56107 19.4751 9.22773 19.4751C8.8944 19.4751 8.60273 19.3501 8.35273 19.1001L0.652734 11.4251C0.452734 11.2251 0.302734 11.0001 0.202734 10.7501C0.102734 10.5001 0.0527344 10.2501 0.0527344 10.0001C0.0527344 9.75011 0.102734 9.50011 0.202734 9.25011C0.302734 9.00011 0.452734 8.77511 0.652734 8.57511L8.35273 0.87511C8.60273 0.62511 8.89857 0.504277 9.24023 0.51261C9.5819 0.520944 9.87773 0.65011 10.1277 0.90011C10.3777 1.15011 10.5027 1.44178 10.5027 1.77511C10.5027 2.10844 10.3777 2.40011 10.1277 2.65011L2.77773 10.0001Z" fill="#8C96A4"/>
            </svg>
          </div>
          <div className="month-txt">{this.state.month.format('M')}월</div>
          <div className="display-flex">
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.next}>
              <path d="M8.275 9.99989L0.924999 2.64989C0.674999 2.39989 0.554165 2.10822 0.562498 1.77489C0.570832 1.44156 0.699998 1.14989 0.949998 0.89989C1.2 0.64989 1.49167 0.52489 1.825 0.52489C2.15833 0.52489 2.45 0.64989 2.7 0.89989L10.4 8.57489C10.6 8.77489 10.75 8.99989 10.85 9.24989C10.95 9.49989 11 9.74989 11 9.99989C11 10.2499 10.95 10.4999 10.85 10.7499C10.75 10.9999 10.6 11.2249 10.4 11.4249L2.7 19.1249C2.45 19.3749 2.15417 19.4957 1.8125 19.4874C1.47083 19.4791 1.175 19.3499 0.925 19.0999C0.675 18.8499 0.55 18.5582 0.55 18.2249C0.55 17.8916 0.675 17.5999 0.925 17.3499L8.275 9.99989Z" fill="#8C96A4"/>
            </svg>
          </div>
        </div>
        <div className="cal-mission">
          {this.state.month.format('M')}월, 모든 미션을 완료한 날은 <span className="bold-txt orange-txt">{this.state.completedAllQuestsDateCount}번</span>
          이에요!
          <br />
          조금만 더 힘내세요!
        </div>
      </div>
    );
  }

  render() {
    return (
      <section className="calendar">
        <header className="header">
          <div className="month-display row">{this.renderMonthLabel()}</div>
          <DayNames />
        </header>
        {this.renderWeeks()}
      </section>
    );
  }
}

class DayNames extends Component {
  render() {
    return (
      <div className="row day-names">
        <div className="day">일</div>
        <div className="day">월</div>
        <div className="day">화</div>
        <div className="day">수</div>
        <div className="day">목</div>
        <div className="day">금</div>
        <div className="day">토</div>
      </div>
    );
  }
}

class Week extends Component {
  render() {
    let days = [];
    let { date, contents, countDetails } = this.props;

    for (let i = 0; i < 7; i++) {
      let day = {
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === this.props.month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date: date,
      };

      let missionCount = contents && contents[date.format('YYYY-MM-DD')] ? contents[date.format('YYYY-MM-DD')].length : 0;

      days.push(
        <Day
          key={day.date.toString()}
          day={day}
          select={this.props.select}
          selected={this.props.selected}
          missionCount={missionCount}
          countDetails={countDetails}
        />
      );

      date = date.clone();
      date.add(1, 'day');
    }

    return <div className="row week">{days}</div>;
  }
}

class Day extends Component {
  render() {
    let { day, select, selected, missionCount, countDetails } = this.props;

    // 기본 클래스네임 설정
    let className = 'day' + (day.isToday ? ' today' : '') + (day.isCurrentMonth ? '' : ' different-month');

    // 선택된 날짜인지 확인
    if (day.date.isSame(selected)) {
      className += ' selected';
    }

    // 날짜를 클래스네임에 추가 (날짜에 따른 클래스 이름 추가)
    const dateClassName = day.date.format('YYYY-MM-DD');
    className += ` ${dateClassName}`;

    // countDetails에서 해당 날짜의 dailyCount를 찾기
    const dateToMatch = day.date.format('YYYY-MM-DD');
    const matchingDetail = countDetails.find(detail => detail.completedDate === dateToMatch);

    // 만약 해당 날짜에 맞는 dailyCount가 존재하면 active 클래스와 dailyCount 추가
    if (matchingDetail) {
      console.log(matchingDetail.dailyCount);
      let dailyCnt =matchingDetail.dailyCount;
      if (dailyCnt >=3){
        dailyCnt=3;
      }
      className += ` active${dailyCnt}`;
    }

    return (
      <div className={className} onClick={() => select(day)}>
        {day.number}
      </div>
    );
  }
}


export default function CalendarWithNavigate(props) {
  const navigate = useNavigate();
  return <Calendar {...props} navigate={navigate} />;
}
