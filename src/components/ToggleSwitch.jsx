export default function ToggleSwitch({ mode, setMode }) {

    return (
        <div className="toggle-switch">
            <input type="radio" name="mode" id="session" value="session" checked={mode === "session"} onChange={() => setMode("session")} />
            <label for="session">Session</label>
            <input type="radio" name="mode" id="break" value="break" checked={mode === "break"} onChange={() => setMode("break")} />
            <label for="break">Break</label>
        </div>
    )
}