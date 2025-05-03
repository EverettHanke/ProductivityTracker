import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { IconButton, TextField, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

const Timer = () => {
  const [totalSeconds, setTotalSeconds] = useState(10); // Total duration in seconds
  const [isPlaying, setIsPlaying] = useState(false); // Timer control state
  const [key, setKey] = useState(0); // Key to reset the timer
  const [inputValue, setInputValue] = useState('00:10'); // Input value in MM:SS format

  const handleTogglePlayPause = () => setIsPlaying((prev) => !prev);
  const handleStop = () => {
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1); // Reset the timer
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regex = /^\d{0,2}:\d{0,2}$/; // Allow MM:SS format
    if (regex.test(value)) {
      setInputValue(value);

      // Parse MM:SS into total seconds
      const [minutes, seconds] = value.split(':').map((v) => parseInt(v || '0', 10));
      if (!isNaN(minutes) && !isNaN(seconds) && seconds < 60) {
        setTotalSeconds(minutes * 60 + seconds);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Timer Controls */}
      <div style={{ marginBottom: '1rem' }}>
        <Typography variant="h6" gutterBottom>
          Set Timer:
        </Typography>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          variant="outlined"
          inputProps={{
            maxLength: 5, // Limit input to MM:SS format
            style: { textAlign: 'center', fontSize: '1.5rem', width: '100px' },
          }}
        />
        <div style={{ marginTop: '0.5rem' }}>
          <IconButton onClick={handleTogglePlayPause} color="primary" aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
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
        duration={totalSeconds}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[totalSeconds, totalSeconds * 0.7, totalSeconds * 0.3, 0]}
      >
        {({ remainingTime }) => formatTime(remainingTime)}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;