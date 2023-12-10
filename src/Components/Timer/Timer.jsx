import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { timeState } from '../../RecoilState';
import { taskState } from '../../RecoilState';
import './Timer.css';

const Timer = ({ task_id, onTimerEnd, onTimerStart }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editingMin, setEditingMin] = useState(false);
  const [editingSec, setEditingSec] = useState(false);

  const setTaskState = useSetRecoilState(taskState);

  const [handle_time, setHandle_time] = useRecoilState(timeState);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsActive(false);
            alert('timer done');
            stopTimer();
            onTimerEnd();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [minutes, seconds, isActive]);

  const setTimer = () => {
    if (isActive) stopTimer();

    const num1 = parseInt(minutes, 10);
    const num2 = parseInt(seconds, 10);

    setMinutes(num1);
    setSeconds(num2);

    toggleEditing();
  };

  const startTimer = () => {
    setIsActive(true);
    const timeAmount = minutes * 60 + seconds;
    setHandle_time(timeAmount);
    console.log(timeAmount);
    console.log('잘 전달됨', handle_time);
    onTimerStart();
  };

  const stopTimer = () => {
    setIsActive(false);

    //onToggle(task_id, true);
    setTaskState({ task_id, isChecked: true });
  };

  const handleMinuteChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMinutes(value >= 0 ? value : 0);
  };

  const handleSecondChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSeconds(value >= 0 && value < 60 ? value : 0);
  };

  const incrementMinute = () => {
    setMinutes(minutes + 1);
  };

  const decrementMinute = () => {
    setMinutes(minutes > 0 ? minutes - 1 : 0);
  };

  const incrementSecond = () => {
    setSeconds(seconds >= 0 && seconds < 60 ? seconds + 1 : 0);
  };

  const decrementSecond = () => {
    setSeconds(seconds > 0 ? seconds - 1 : 0);
  };

  const toggleEditing = () => {
    if (!isActive) {
      setEditing(!editing);
    }
  };

  const toggleEditingMin = (e) => {
    e.stopPropagation();
    if (!isActive) {
      setEditingMin(!editingMin);
    }
  };
  const toggleEditingSec = (e) => {
    e.stopPropagation();
    if (!isActive) {
      setEditingSec(!editingSec);
    }
  };

  return (
    <div className='timer'>
      <h3>Timer</h3>
      {editing ? (
        <div className='timer-controller'>
          {!editingMin ? (
            <div
              className='timer-display-min'
              onClick={toggleEditingMin}
              onChange={handleMinuteChange}
            >
              {minutes < 10 ? '0' + minutes : minutes}
              <IoIosArrowUp
                className='incrementMin'
                onClick={(e) => {
                  e.stopPropagation();
                  incrementMinute();
                }}
              />
              <IoIosArrowDown
                className='decrementMin'
                onClick={(e) => {
                  e.stopPropagation();
                  decrementMinute();
                }}
              />
            </div>
          ) : (
            <input
              className='editingMin'
              type='text'
              value={minutes}
              onChange={handleMinuteChange}
              onClick={toggleEditingMin}
              autoFocus
            />
          )}
          <div className='between'>: </div>
          {!editingSec ? (
            <div
              className='timer-display-sec'
              onClick={toggleEditingSec}
              onChange={handleSecondChange}
            >
              {seconds < 10 ? '0' + seconds : seconds}
              <IoIosArrowUp
                className='incrementSec'
                onClick={(e) => {
                  e.stopPropagation();
                  incrementSecond();
                }}
              />
              <IoIosArrowDown
                className='decrementSec'
                onClick={(e) => {
                  e.stopPropagation();
                  decrementSecond();
                }}
              />
            </div>
          ) : (
            <input
              className='editingSec'
              type='text'
              value={seconds}
              onChange={handleSecondChange}
              onClick={toggleEditingSec}
              autoFocus
            />
          )}
          <button
            onClick={() => {
              startTimer();
              setTimer();
            }}
          >
            Start
          </button>
        </div>
      ) : (
        <div className='timer-display'>
          {minutes < 10 ? '0' + minutes : minutes} :{' '}
          {seconds < 10 ? '0' + seconds : seconds}
          <button className='timer-display-toggle' onClick={toggleEditing}>
            Set time
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
