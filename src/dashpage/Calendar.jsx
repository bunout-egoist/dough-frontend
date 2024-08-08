import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles.css';
import { useNavigate } from 'react-router-dom';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment(),
      selected: moment().startOf('day'),
      monthlyMissionList: [1, 3, 3, 0, 2, 0, 3, 1, 0, 2, 0, 0, 0, 0, 1, 3, 3, 3, 2, 3, 2, 1, 1, 1, 3, 0, 3, 3, 2, 3, 1],
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.select = this.select.bind(this);
  }

  previous() {
    this.setState({ month: this.state.month.subtract(1, 'month') });
  }

  next() {
    this.setState({ month: this.state.month.add(1, 'month') });
  }

  select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone(),
    });

    const formattedDate = day.date.format('YYMMDDddd');
    console.log("Navigating to: ", `/detail/${formattedDate}`); // Debugging output

    // 날짜를 인자로 넘기면서 페이지 이동
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
          monthlyMissionList={this.state.monthlyMissionList}
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
            <svg
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.previous}
            >
              <path
                d="M2.725 10.0001L10.075 17.3501C10.325 17.6001 10.4458 17.8918 10.4375 18.2251C10.4292 18.5584 10.3 18.8501 10.05 19.1001C9.8 19.3501 9.50833 19.4751 9.175 19.4751C8.84167 19.4751 8.55 19.3501 8.3 19.1001L0.6 11.4251C0.4 11.2251 0.25 11.0001 0.15 10.7501C0.05 10.5001 0 10.2501C0 10.0001 0 9.75011 0.15 9.25011C0.25 9.00011 0.4 8.77511 0.6 8.57511L8.3 0.87511C8.55 0.62511 8.84583 0.504277 9.1875 0.51261C9.52917 0.520944 9.825 0.65011 10.075 0.90011C10.325 1.15011 10.45 1.44178 10.45 1.77511C10.45 2.10844 10.325 2.40011 10.075 2.65011L2.725 10.0001Z"
                fill="#8C96A4"
              />
            </svg>
          </div>
          <div className="month-txt">{this.state.month.format('M')}월</div>
          <div className="display-flex">
            <svg
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={this.next}
            >
              <path
                d="M8.275 9.99989L0.924999 2.64989C0.674999 2.39989 0.554165 2.10822 0.562498 1.77489C0.570832 1.44156 0.699998 1.14989 0.949998 0.89989C1.2 0.64989 1.49167 0.52489 1.825 0.52489C2.15833 0.52489 2.45 0.64989 2.7 0.89989L10.4 8.57489C10.6 8.77489 10.75 8.99989 10.85 9.24989C10.95 9.49989 11 9.74989 11 9.99989C11 10.2499 10.95 10.4999 10.85 10.7499C10.75 10.9999 10.6 11.2249 10.4 11.4249L2.7 19.1249C2.45 19.3749 2.15417 19.4957 1.8125 19.4874C1.47083 19.4791 1.175 19.3499 0.925 19.0999C0.675 18.8499 0.55 18.5582 0.55 18.2249C0.55 17.8916 0.675 17.5999 0.925 17.3499L8.275 9.99989Z"
                fill="#8C96A4"
              />
            </svg>
          </div>
        </div>
        <div className="cal-mission">
          {this.state.month.format('M')}월, 모든 미션을 완료한 날은 <span className="bold-txt orange-txt">7번</span>
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
    let { date } = this.props;

    for (let i = 0; i < 7; i++) {
      let day = {
        name: date.format('dd').substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === this.props.month.month(),
        isToday: date.isSame(new Date(), 'day'),
        date: date,
        missions: this.props.monthlyMissionList[date.date() - 1] || 0,
      };

      days.push(
        <Day key={day.date.toString()} day={day} selected={this.props.selected} select={this.props.select} />
      );

      date = date.clone();
      date.add(1, 'day');
    }

    return <div className="row week">{days}</div>;
  }
}

class Day extends Component {
  render() {
    const { day, select, selected } = this.props;
    let className = 'day' + (day.isToday ? ' today' : '') + (day.isCurrentMonth ? '' : ' different-month');

    if (day.date.isSame(selected)) {
      className += ' selected';
    }

    className += ` active${day.missions}`;

    return (
      <div className={className} onClick={() => select(day)}>
        {day.number}
      </div>
    );
  }
}

// React Router v6의 useNavigate를 사용할 수 있도록 Calendar를 감싸는 함수형 컴포넌트
const CalendarWithNavigate = (props) => {
  const navigate = useNavigate();
  return <Calendar {...props} navigate={navigate} />;
};

export default CalendarWithNavigate;
