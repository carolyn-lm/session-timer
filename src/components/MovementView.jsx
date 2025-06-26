
// Movement view - displays list of daily verses with checkboxes and reset button
export default function MovementView({ completedDaily, toggleDaily, resetDaily }) {
    const movementList = ["Beloved", "DP", "6T", "LP", "SSB", "RMA"];

    return (
        <div>
            {movementList.map((item) => (
                <div className="checkbox" key={item}>
                    <input type="checkbox" id={item} checked={completedDaily.includes(item)} onChange={() => toggleDaily(item)} /> <label htmlFor={item}>{item}</label>
                </div>
            ))}
            <button className="reset-btn" onClick={resetDaily}>Reset</button>
        </div>
    )
}