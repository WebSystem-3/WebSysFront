import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import colorDiff from '../Utils/colorDiff';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, dateState, timeState, selectedFriendState } from '../../RecoilState';
import './calendar.css';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className='header_row'>
      <div className='col-start'>
        <span className='text'>
          <span className='text_month'>{format(currentMonth, 'M')}월</span>
        </span>
      </div>
      <div className='col-end'>
        <button className='prevMonth' onClick={prevMonth}>
          &lt;
        </button>
        <button className='nextMonth' onClick={nextMonth}>
          &gt;
        </button>
      </div>
    </div>
  );
};
const RenderDays = () => {
  const days = [];
  const weekdays = ['Sun', 'Mon', 'Thu', 'Wed', 'Thr', 'Fri', 'Sat'];
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className='col' key={i}>
        {weekdays[i]}
      </div>
    );
  }
  return <div className='days_row'>{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(startMonth);
  const startDate = startOfWeek(startMonth);
  const endDate = endOfWeek(endMonth);
  const timeValue = useRecoilValue(timeState);

  const rows = [];
  let days = [];
  let day = startDate;
  let dateFormat = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      dateFormat = format(day, 'd');
      const cloneDay = day;
      //const cloneDays = [];
      days.push(
        <div
          className={`col-cell-${
            !isSameMonth(day, startMonth)
              ? 'disabled'
              : isSameDay(day, selectedDate)
              ? 'selected'
              : format(currentMonth, 'M') !== format(day, 'M')
              ? 'not-valid'
              : 'valid'
          }`}
          key={day}
          onClick={() => {
            onDateClick(cloneDay);
            //onDateClick(parse(cloneDay, 'yyyy-MM-dd', new Date()));
            //cloneDays.push(cloneDay);
            //console.log(`${cloneDay.getFullYear()}-${cloneDay.getMonth()+1}-${cloneDay.getDate()}`);
          }}
          style={{
            backgroundColor: timeValue[format(day, 'yyyy-MM-dd')]
              ? colorDiff(timeValue[format(day, 'yyyy-MM-dd')])
              : isSameDay(day, selectedDate)
              ? null
              : 'white',
          }}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }
          >
            {dateFormat}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className='row' key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className='body'>{rows}</div>;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [handle_date, setHandle_date] = useRecoilState(dateState);
  const [timeValue, setTimeValue] = useRecoilState(timeState);
  const [user_id] = useRecoilState(userState);
  const selectedFriendID= useRecoilValue(selectedFriendState);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (cloneDay) => {
    setSelectedDate(cloneDay);
    setHandle_date(
      `${cloneDay.getFullYear()}-${
        cloneDay.getMonth() + 1
      }-${cloneDay.getDate()}`
    );
    //console.log(handle_date);
    //console.log(setSelectedDate);
  };

  useEffect(() => {
    const start_date = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
    const end_date = format(endOfMonth(currentMonth), 'yyyy-MM-dd');
    console.log('내 아이디', user_id);
    if (selectedFriendID!==null){
      user_id = selectedFriendID;
      console.log('친구아이디: ', user_id);
    }
    fetch(
      `http://43.201.197.131:8080/${user_id}/task/${start_date}/${end_date}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const taskTimes = data.reduce((acc, cur) => {
          acc[cur.task_date] = cur.total_task_time;
          return acc;
        }, {});
        setTimeValue(taskTimes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [currentMonth, user_id]);

  useEffect(() => {
    // console.log(handle_date);
  }, [handle_date]);

  return (
    <div className='calendar'>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};

export default Calendar;
