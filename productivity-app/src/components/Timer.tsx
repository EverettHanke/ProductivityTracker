import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

const Timer = () => {
  const [minutes, setMinutes] = useState(0); // Minutes input
  const [seconds, setSeconds] = useState(10); // Seconds input
  const [isPlaying, setIsPlaying] = useState(false); // Timer control state
  const [key, setKey] = useState(0); // Key to reset the timer

  // Calculate total duration in seconds
  const duration = minutes * 60 + seconds;

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleStop = () => {
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1); // Reset the timer
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Timer Controls */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Minutes:{' '}
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
            min="0"
          />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Seconds:{' '}
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
            min="0"
            max="59"
          />
        </label>
        <div style={{ marginTop: '0.5rem' }}>
          <IconButton onClick={handleStart} color="primary" aria-label="Start">
            <PlayArrowIcon />
          </IconButton>
          <IconButton onClick={handlePause} color="secondary" aria-label="Pause">
            <PauseIcon />
          </IconButton>
          <IconButton onClick={handleStop} color="error" aria-label="Stop">
            <StopIcon />
          </IconButton>
        </div>
      </div>

      {/* Countdown Timer */}
      <CountdownCircleTimer
        key={key} // Reset the timer when the key changes
        isPlaying={isPlaying}
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[duration, duration * 0.7, duration * 0.3, 0]}
      >
        {({ remainingTime }) => {
          const displayMinutes = Math.floor(remainingTime / 60);
          const displaySeconds = remainingTime % 60;
          return `${displayMinutes}:${displaySeconds.toString().padStart(2, '0')}`;
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;