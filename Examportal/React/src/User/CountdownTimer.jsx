import React, { useState, useEffect } from 'react';

const CountdownTimer = ({noq,calculateMarks}) => {
  const [seconds, setSeconds] = useState(noq*60); 
  const [timerColor, setTimerColor] = useState('black');
  useEffect(() => {
    // Initialize timer value in local storage if not already set
    if (window.localStorage.getItem("time") === null) {
        window.localStorage.setItem("time", noq * 60);
    }
    else{
      setSeconds(window.localStorage.getItem("time"));
    }

    const intervalId = setInterval(() => {
        const time = parseInt(window.localStorage.getItem("time")) || 0;
         window.localStorage.setItem("time", time - 10);
    }, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
}, []);

useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          calculateMarks();
          // Trigger alert when timer reaches 0
        } else if (prevSeconds <= 61) {
          // Change color to red when timer reaches 1 minute
          setTimerColor('red');
        } else if (prevSeconds === 121) {
          // Trigger alert when timer reaches 2 minutes
          alert('Alert ⚠️ ⚠️ You have 2 minutes remaining!');
        }

        return prevSeconds - 1;
      });
    }, 1000);
    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
}, []);

  
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{ textAlign: 'center'}}>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: timerColor }}>
        {formatTime(seconds)}
      </p>
    </div>
  );
};



export default CountdownTimer;