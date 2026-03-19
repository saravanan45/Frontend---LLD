import { useState, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [isAdPlaying, setIsAdPlaying] = useState(true);

  const [adTimeElapsed, setADTimeElapsed] = useState(0);
  // const [timer, setTimer] = useState(0);
  // const timerInterval = useRef(null);
  const videoRef = useRef(null);
  const SKIP_TIME = 5;

  const handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    const second = Math.floor(currentTime);

    if (second !== adTimeElapsed && second <= SKIP_TIME) {
      setADTimeElapsed(second);
    }
  };

  // useEffect(() => {
  //   if (!isAdPlaying) {
  //     return;
  //   }

  //   clearInterval(timerInterval.current);

  //   const id = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev >= SKIP_TIME) {
  //         return prev ;
  //       }
  //       return prev + 1;
  //     });
  //   }, 1000);

  //   timerInterval.current = id;

  //   return () => clearInterval(id);
  // }, [isAdPlaying]);

  // useEffect(() => {
  //   if (timer >= SKIP_TIME) {
  //     clearInterval(timerInterval.current);
  //     timerInterval.current = null;
  //   }
  // }, [timer]);

  const handleSkipAd = () => {
    setIsAdPlaying(false);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    videoRef.current.muted = false;
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={isAdPlaying ? "/video-files/ad.mp4" : "/video-files/mainVideo.mp4"}
        autoPlay
        muted
        width="500px"
        height="500px"
        controls
        onTimeUpdate={handleTimeUpdate}
      />
      {isAdPlaying ? (
        <button
          className="skip-ad-button"
          onClick={handleSkipAd}
          disabled={SKIP_TIME > adTimeElapsed}
        >
          Skip AD in {SKIP_TIME - adTimeElapsed}
        </button>
      ) : null}
    </div>
  );
}

export default App;
