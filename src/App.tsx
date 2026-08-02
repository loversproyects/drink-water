import './App.css';
import './styles/theme.css';
import { cerrarVentana } from './utils/windowActions';
import { useCountdown } from './utils/useCountdown';

function App() {
  const { displayValue, reset, stop, play, setTime } = useCountdown();

  const minutes = Number(displayValue.split(':')[0]);
  const seconds = Number(displayValue.split(':')[1]);
  const minutesDisplay = String(minutes).padStart(2, '0');
  const secondsDisplay = String(seconds).padStart(2, '0');

  return (
    <div className="window-container">
      <div className="header-bar" data-tauri-drag-region>
        <span className="title" data-tauri-drag-region>Water Project</span>
        <button className="close-button" onClick={cerrarVentana}>
          ✕
        </button>
      </div>

      <div className="timer-section">
        <div className="time-picker">
          <input
            className="time-input"
            type="number"
            min="0"
            max="60"
            value={minutesDisplay}
            onChange={(e) => setTime(Number(e.target.value || 0), seconds)}
          />
          <span className="time-separator">:</span>
          <input
            className="time-input"
            type="number"
            min="0"
            max="59"
            value={secondsDisplay}
            onChange={(e) => setTime(minutes, Number(e.target.value || 0))}
          />
        </div>

        <div className="timer-controls">
          <button className="timer-button reset-button" onClick={reset}>
            Reset
          </button>
          <button className="timer-button stop-button" onClick={stop}>
            Stop
          </button>
          <button className="timer-button play-button" onClick={play}>
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;