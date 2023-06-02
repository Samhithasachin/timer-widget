import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setCount((prevCount) => prevCount + 1);
      }
    }, 1000);

    const activityListener = () => {
      setIsActive(true);
      setLastActivityTime(Date.now());
    };

    const inactivityTimer = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastActivityTime > 10000) {
        setIsActive(false);
      }
    }, 1000);

    document.addEventListener("mousemove", activityListener);
    document.addEventListener("keydown", activityListener);

    return () => {
      clearInterval(interval);
      clearInterval(inactivityTimer);
      document.removeEventListener("mousemove", activityListener);
      document.removeEventListener("keydown", activityListener);
    };
  }, [isActive, lastActivityTime]);



  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const backgroundStyle = {
    background: isActive ? 'green' : 'red',
  };


  return (
    <div className="outer-box" style={backgroundStyle}>
      <p className="heading">Screen time: {formatTime(count)}</p>
      
    </div>
  );
}

export default Timer;
