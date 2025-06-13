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

const startingChecklist = [
  { id: 1, text: "Beloved & Hymn", completed: false },
  { id: 2, text: "DP & Daily", completed: false },
  { id: 3, text: "6T & Idea", completed: false },
  { id: 4, text: "LP & Quality", completed: false },
  { id: 5, text: "SSB & Advice", completed: false },
  { id: 6, text: "RMA & Topic", completed: false },
];

function App() {
  const [mode, setMode] = useState("session");
  const [verses, setVerses] = useState(JSON.parse(window.localStorage.getItem("verses")) || placeholderVerses);
  const [timeRemaining, setTimeRemaining] = useState(3000);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [breakList, setBreakList] = useState(JSON.parse(window.localStorage.getItem("breaks")) || []);
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
        {mode === "settings" && <BreakSettings breakList={breakList} updateBreak={updateBreak} />}
        {mode === "break" && <BreakView currentBreak={breakList[currentBreak]} numBreaks={breakList.length} nextBreak={nextBreak} />}
      </main>
      {/* <aside>
        <BreakList breakList={breakList} updateBreak={updateBreak} resetBreaks={resetBreaks} />
      </aside> */}
    </div>
  )
}

export default App
