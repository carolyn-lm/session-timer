function TimerButton({ minutes, setTimer }) {
    return <button className="timer-button" onClick={() => setTimer(minutes)}>{minutes}</button>
}

// Buttons to set time for timer
export default function TimerButtons({ setTimer }) {
    const times = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

    return (
        <div className="button-container">
            {times.map(time => <TimerButton key={time} minutes={time} setTimer={setTimer} />)}
        </div>
    )
}