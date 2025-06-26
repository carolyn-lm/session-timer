import { useState } from "react"

// One break item - includes text input and label
function BreakInfo({ id, label, name, value, updateBreak }) {
    return (
        <div className="break-info">
            <label>{label}</label>
            <input type="text" value={value} onChange={(e) => updateBreak(id, name, e.target.value)} />
        </div>
    )
}

// Used in Settings mode. Gives options for number of breaks and then set movement & prayer for each break
export default function BreakSettings({ breakList, updateBreak, adjustBreakNum }) {
    const [numBreaks, setNumBreaks] = useState(6);

    const handleChangeBreaks = (e) => {
        setNumBreaks(e.target.value);
        adjustBreakNum(e.target.value);
    }

    return (
        <div>
            <h2>Break Settings</h2>
            <h3>Number of Breaks</h3>
            <input type="number" value={numBreaks} onChange={handleChangeBreaks} />
            {breakList.map(brItem => (
                <div className="break-items" key={brItem.id}> <h3>BREAK {brItem.id} </h3>
                    <BreakInfo id={brItem.id} label="Movement" name="movement" value={brItem.movement} updateBreak={updateBreak} />
                    <BreakInfo id={brItem.id} label="Prayer" name="prayer" value={brItem.prayer} updateBreak={updateBreak} />
                </div>
            ))}
        </div>
    )
}