import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

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

    const num1 = parseInt(prompt('분을 입력하시오'));
    const num2 = parseInt(prompt('초를 입력하시오'));

    setMinutes(num1);
    setSeconds(num2);
    const timeAmount = num1 * 60 + num2;
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

  return (
    <div className='timer'>
      <h3>Timer</h3>
      <div className='timer-display'>
        {minutes < 10 ? '0' + minutes : minutes} :{' '}
        {seconds < 10 ? '0' + seconds : seconds}
      </div>
      <div className='timer-controller'>
        <button onClick={setTimer}>Set</button>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
