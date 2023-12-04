import React, { useState, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { timeState } from '../../RecoilState';
import { useSetRecoilState } from 'recoil';
import { taskState } from '../../RecoilState';
import './Timer.css';

const Timer = ({ taskId }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editingMin, setEditingMin] = useState(false);
  const [editingSec, setEditingSec] = useState(false);

  const setTaskState = useSetRecoilState(taskState);

  const [handle_time, setHandle_time] = useRecoilValue(timeState);

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
    //const timeAmount = num1 * 60 + num2;
    //setHandle_time(timeAmount);
    //console.log(handle_time);
    toggleEditing();
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    const timeAmount = minutes * 60 + seconds;
    setHandle_time(timeAmount);
    setTaskState({ taskId, isChecked: true });
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
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
    setEditing(!editing);
  };

  const toggleEditingMin = () => {
    setEditingMin(!editingMin);
  };
  const toggleEditingSec = () => {
    setEditingSec(!editingSec);
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
