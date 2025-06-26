// Timer display, shows count down of minutes and seconds and start/stop button
export default function Timer({ timeRemaining, toggleTimer }) {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="timer">
            <p className="timer-display">{minutes}:{seconds < 10 ? "0" : ""}
                {seconds}</p>
            <button className="timer-button" id="start_stop" onClick={toggleTimer}>
                <i className="fa-solid fa-play"></i>
                <i className="fa-solid fa-pause"></i>
            </button>
        </div>
    )
}