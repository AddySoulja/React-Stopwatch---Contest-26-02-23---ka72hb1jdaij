import React, { useEffect, useRef, useState } from "react";
import "../styles/App.css";

const App = () => {
  // const startTime = useRef(0);
  // const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setCurrentTime((currentTime) => currentTime + 0.01);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const start_stop = () => {
    setIsActive(!isActive);
    setIsPaused(!isPaused);
  };

  const lapStopwatch = () => {
    setLaps([...laps, currentTime]);
  };
  const resetStopwatch = () => {
    setCurrentTime(0);
    setLaps([]);
  };
  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed" ref={startTime}>
          {currentTime.toFixed(3)}
        </h1>
        <section className="buttons">
          <button className="start-btn" onClick={start_stop}>
            START
          </button>
          <button className="stop-btn" onClick={start_stop}>
            STOP
          </button>
          <button className="lap-btn" onClick={lapStopwatch}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetStopwatch}>
            RESET
          </button>
        </section>
      </section>
      {laps.length > 0 ? (
        <section className="lap-section">
          <h2>Laps</h2>
          <section className="laps">
            {laps.map((lap, index) => (
              <p key={index}>{lap.toFixed(3)}</p>
            ))}
          </section>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
