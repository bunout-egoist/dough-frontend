import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles.css';

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
    return <span className="month-label">{this.state.month.format('MMMM YYYY')}</span>;
  }

  render() {
    return (
      <section className="calendar">
        <header className="header">
          <div className="month-display row">
            <i className="arrow fa fa-angle-left" onClick={this.previous} />
            {this.renderMonthLabel()}
            <i className="arrow fa fa-angle-right" onClick={this.next} />
          </div>
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
        <span className="day">S</span>
        <span className="day">M</span>
        <span className="day">T</span>
        <span className="day">W</span>
        <span className="day">T</span>
        <span className="day">F</span>
        <span className="day">S</span>
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
        <Day
          key={day.date.toString()}
          day={day}
          selected={this.props.selected}
          select={this.props.select}
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
    const { day, select, selected } = this.props;
    let className = 'day' + (day.isToday ? ' today' : '') + (day.isCurrentMonth ? '' : ' different-month');

    if (day.date.isSame(selected)) {
      className += ' selected';
    }

    className += ` active${day.missions}`;

    return (
      <span className={className} onClick={() => select(day)}>
        {day.number}
      </span>
    );
  }
}

export default Calendar;
