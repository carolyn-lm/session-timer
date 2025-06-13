import { useState, useEffect } from 'react'
import './App.css'
import Verses from './components/Verses'
import Timer from './components/Timer';
import TimerButtons from './components/TimerButtons';
import BreakList from './components/BreakList';
import { useSound } from 'react-sounds';
import Header from './components/Header';
import BreakSettings from './components/BreakSettings';
import BreakView from './components/BreakView';

const placeholderVerses = [
  { id: 1, text: "", placeholder: "Verse of the week" },
  { id: 2, text: "", placeholder: "Memorized verse for review" },
  { id: 3, text: "", placeholder: "Idea about God" },
  { id: 4, text: "", placeholder: "Affirmation for today" }
];

const startingBreakList = [
  { id: 1, daily: "", prayer: "", movement: "" },
  { id: 2, daily: "", prayer: "", movement: "" },
  { id: 3, daily: "", prayer: "", movement: "" },
  { id: 4, daily: "", prayer: "", movement: "" },
  { id: 5, daily: "", prayer: "", movement: "" },
  { id: 6, daily: "", prayer: "", movement: "" },
];

function App() {
  const [mode, setMode] = useState("session");
  const [verses, setVerses] = useState(JSON.parse(window.localStorage.getItem("verses")) || placeholderVerses);
  const [timeRemaining, setTimeRemaining] = useState(3000);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [breakList, setBreakList] = useState(JSON.parse(window.localStorage.getItem("breaks")) || startingBreakList);
  const [currentBreak, setCurrentBreak] = useState(JSON.parse(window.localStorage.getItem("currentBreak")) || 0);

  const { play } = useSound('notification/completed');

  useEffect(() => {
    window.localStorage.setItem("verses", JSON.stringify(verses));
  }, [verses]);

  useEffect(() => {
    window.localStorage.setItem("breaks", JSON.stringify(breakList));
  }, [breakList]);

  useEffect(() => {
    window.localStorage.setItem("currentBreak", JSON.stringify(currentBreak));
  }, [currentBreak]);


  useEffect(() => {
    let intervalId;

    if (isTimerActive) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevSeconds) => {
          if (prevSeconds === 0) {
            setIsTimerActive(false);
            play();
            return 0;
          } else {
            return prevSeconds - 1;
          }

        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isTimerActive]);

  const updateVerse = (verseId, newText) => {
    const updatedVerseList = verses.map((verse) => {
      if (verse.id === verseId) {
        verse.text = newText;
      }
      return verse;
    });
    setVerses(updatedVerseList);
  }

  const resetVerses = (dailyOnly) => {
    console.log("reset", dailyOnly);
    const updatedVerseList = verses.map((verse) => {
      if (!dailyOnly || (dailyOnly && verse.id != 1)) {
        verse.text = "";
      }
      return verse;
    });
    setVerses(updatedVerseList);
  }

  const setTimer = (minutes) => {
    setTimeRemaining(minutes * 60);
  }

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  }

  const adjustBreakNum = (newNum) => {
    const breaks = [...breakList];
    let nextID = breakList.length + 1;
    while (breaks.length < numBreaks) {
      breaks.push({ id: nextID, daily: "", prayer: "", movement: "" });
      nextID++;
    }
    while (breaks.length > numBreaks) {
      breaks.pop();
    }
    setBreakList(breaks);
  }

  const updateBreak = (breakId, field, newValue) => {
    const updatedBreakList = breakList.map((item) => {
      if (item.id === breakId) {
        item[field] = newValue;
      }
      return item;
    });
    setBreakList(updatedBreakList);
  }

  const nextBreak = () => {
    const nextNum = (currentBreak === breakList.length - 1) ? 0 : currentBreak + 1;
    setCurrentBreak(nextNum);
    setMode("session");
  }

  return (
    <div className='App'>
      <main>
        <Header mode={mode} setMode={setMode} />
        <Verses mode={mode} verseList={verses} updateVerse={updateVerse} resetVerses={resetVerses} />
        {mode === "session" && <Timer timeRemaining={timeRemaining} toggleTimer={toggleTimer} />}
        {mode === "session" && <TimerButtons setTimer={setTimer} />}
        {mode === "settings" && <BreakSettings breakList={breakList} updateBreak={updateBreak} adjustBreakNum={adjustBreakNum} />}
        {mode === "break" && <BreakView currentBreak={breakList[currentBreak]} numBreaks={breakList.length} nextBreak={nextBreak} />}
      </main>

    </div>
  )
}

export default App
