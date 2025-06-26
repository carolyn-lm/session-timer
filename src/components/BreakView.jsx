// Break View shows checkboxes for each break, plus reset button
export default function BreakView({ breakList, completedBreaks, toggleBreak, resetBreaks }) {
    return (
        <div id="break-view">
            {
                breakList.map((breakItem, index) => (
                    <div className="break-item" key={index}>
                        <h2>Break {index + 1}</h2>
                        <div className="checkbox"><input type="checkbox" onChange={() => toggleBreak("movement" + index)} checked={completedBreaks.includes("movement" + index)}></input> <label>{breakItem.movement}</label></div>
                        <div className="checkbox"><input type="checkbox" onChange={() => toggleBreak("prayer" + index)} checked={completedBreaks.includes("prayer" + index)}></input> <label>{breakItem.prayer}</label></div>
                    </div>
                ))
            }
            <button className="reset-btn" onClick={resetBreaks}>Reset</button>

        </div>

    )
}