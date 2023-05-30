import React, { useState, useRef } from "react";
import "./Timer.css";
import { formatTime } from "../../utils/utils";
import startLogo from "../../images/start.svg";
import stopLogo from "../../images/stop.svg";
import resetLogo from "../../images/reset.svg";

function Timer({ timer, update, reset, title }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      update(title);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      update(title);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    reset(title);
  };

  return (
    <div className="timer">
      <p className="timer__number">{formatTime(timer)}</p>
      <div className="timer__wrapper">
        {!isActive && !isPaused ? (
          <button className="timer__button" onClick={handleStart}>
            <img className="timer__logo" src={startLogo} alt="start" />
            Start
          </button>
        ) : isPaused ? (
          <button className="timer__button" onClick={handlePause}>
            <img className="timer__logo" src={stopLogo} alt="stop" />
            Pause
          </button>
        ) : (
          <button className="timer__button" onClick={handleResume}>
            <img className="timer__logo" src={startLogo} alt="start" />
            Resume
          </button>
        )}
        <button
          className="timer__button"
          onClick={handleReset}
          disabled={!isActive}
        >
          <img className="timer__logo" src={resetLogo} alt="reset" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;
