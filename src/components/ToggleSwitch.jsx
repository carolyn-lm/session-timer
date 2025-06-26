// Radio buttons to switch between modes
export default function ToggleSwitch({ mode, setMode }) {

    return (
        <div className="toggle-switch">
            <input type="radio" name="mode" id="session" value="session" checked={mode === "session"} onChange={() => setMode("session")} />
            <label htmlFor="session">Session</label>
            <input type="radio" name="mode" id="movement" value="movement" checked={mode === "movement"} onChange={() => setMode("movement")} />
            <label htmlFor="movement">Movement</label>
            <input type="radio" name="mode" id="break" value="break" checked={mode === "break"} onChange={() => setMode("break")} />
            <label htmlFor="break">Break</label>
        </div>
    )
}