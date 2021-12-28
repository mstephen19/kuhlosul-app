import React, { useState, useRef, useEffect } from 'react';

export default function Timer({ releaseDate }) {
  const [timerValues, setTimerValues] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const { days, hours, minutes, seconds } = timerValues;

  let interval = useRef();

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  const startTimer = () => {
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(releaseDate).getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) return clearInterval(interval.current);

      setTimerValues({ days, hours, minutes, seconds });
    }, 1000);
  };

  return (
    <div>
      <h3>
        {days}d : {hours}h : {minutes}m : {seconds}s
      </h3>
    </div>
  );
}
