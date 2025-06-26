import ToggleSwitch from './ToggleSwitch';

// App Header. Shows header and Done button in settings mode, otherwise has toggle switch and gear icon for switching between modes
export default function Header({ mode, setMode }) {
    return (
        <>
            {mode === "settings" ?
                (<div className='settings-header'>
                    <h1>Settings</h1>
                    <button onClick={() => setMode("session")}>Done</button>
                    <h2>Verses</h2>
                </div>)
                :
                (<div className='app-header'>
                    <ToggleSwitch mode={mode} setMode={setMode} />

                    <p id="settings" onClick={() => setMode("settings")}><i className="fa-solid fa-gear"></i></p>
                </div>)}
        </>
    )
}