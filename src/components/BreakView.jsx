export default function BreakView({ currentBreak, numBreaks, nextBreak }) {
    return (
        <div id="break-view">
            <h2>Break {currentBreak.id} of {numBreaks}</h2>
            <div className="break"><input type="checkbox"></input><label>{currentBreak.daily}</label></div>
            <div className="break"><input type="checkbox"></input><label>{currentBreak.movement}</label></div>
            <div className="break"><input type="checkbox"></input><label>{currentBreak.prayer}</label></div>
            <button className="timer-button" onClick={nextBreak}>Done</button>
        </div>
    )
}