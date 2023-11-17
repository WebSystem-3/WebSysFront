import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingMin, setEditingMin] = useState(true);
  const [editingSec, setEditingSec] = useState(true);

  useEffect(() => {
    let timer;

    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsActive(false);
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
    const timeAmount = num1 * 60 + num2;
    console.log(timeAmount);
    toggleEditing();
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
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
          {editingMin ? (
            <div
              className='timer-display-min'
              onClick={toggleEditingMin}
              onChange={handleMinuteChange}
            >
              {minutes < 10 ? '0' + minutes : minutes} :{' '}
              <button onClick={incrementMinute}>+</button>
              <button onClick={decrementMinute}>-</button>
            </div>
          ) : (
            <input
              type='text'
              value={minutes}
              onChange={handleMinuteChange}
              onFocus={toggleEditingMin}
            />
          )}

          {editingSec ? (
            <div
              className='timer-display-sec'
              onClick={toggleEditingSec}
              onChange={handleSecondChange}
            >
              {seconds < 10 ? '0' + seconds : seconds}
              <button onClick={incrementSecond}>+</button>
              <button onClick={decrementSecond}>-</button>
            </div>
          ) : (
            <input
              type='text'
              value={seconds}
              onChange={handleSecondChange}
              onFocus={toggleEditingSec}
            />
          )}

          <button onClick={setTimer}>Set</button>
        </div>
      ) : (
        <div className='timer-display' onClick={toggleEditing}>
          {minutes < 10 ? '0' + minutes : minutes} :{' '}
          {seconds < 10 ? '0' + seconds : seconds}
        </div>
      )}

      <div className='timer-controller'>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
