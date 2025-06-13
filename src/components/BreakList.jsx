export default function BreakList({ breakList, updateBreak, resetBreaks }) {
    return (
        <div className="checklist">
            {breakList.map(item => (
                <div className="break" key={item.id}>
                    <input type="checkbox" checked={item.completed} onChange={() => updateBreak(item.id)}></input>
                    <label>{item.text}</label>
                </div>
            ))}
            <button className="timer-button" onClick={resetBreaks}>Reset</button>
        </div>
    )

}