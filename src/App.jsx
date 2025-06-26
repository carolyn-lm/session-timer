import { useState, useEffect } from 'react'
import './App.css'
import Verses from './components/Verses'
import Timer from './components/Timer';
import TimerButtons from './components/TimerButtons';
import { useSound } from 'react-sounds';
import Header from './components/Header';
import BreakSettings from './components/BreakSettings';
import BreakView from './components/BreakView';
import MovementView from './components/MovementView';

const placeholderVerses = [
  { id: 1, text: "", placeholder: "Verse of the week" },
  { id: 2, text: "", placeholder: "Memorized verse for review" },
  { id: 3, text: "", placeholder: "Idea about God" },
  { id: 4, text: "", placeholder: "Affirmation for today" }
];

const startingBreakList = [
  { id: 1, prayer: "", movement: "" },
  { id: 2, prayer: "", movement: "" },
  { id: 3, prayer: "", movement: "" },
  { id: 4, prayer: "", movement: "" },
  { id: 5, prayer: "", movement: "" },
  { id: 6, prayer: "", movement: "" },
];

function App() {
  // mode determines what is displayed: session, movement, break, or settings
  const [mode, setMode] = useState("session");
  // List of verses. First verse always displayed, all verses displayed in movement mode, can edit in settings mode, saved to local storage
  const [verses, setVerses] = useState(JSON.parse(window.localStorage.getItem("verses")) || placeholderVerses);
  // for timer in session mode
  const [timeRemaining, setTimeRemaining] = useState(3000);
  const [isTimerActive, setIsTimerActive] = useState(false);
  // list of breaks for break mode
  const [breakList, setBreakList] = useState(JSON.parse(window.localStorage.getItem("breaks")) || startingBreakList);
  // list of completed breaks - saved to local storage
  const [completedBreaks, setCompletedBreaks] = useState(JSON.parse(window.localStorage.getItem("completedBreaks")) || []);
  // list of completed daily verses - used in movement mode
  const [completedDaily, setCompletedDaily] = useState(JSON.parse(window.localStorage.getItem("completedDaily")) || []);

  // Sound to play when timer completes
  const { play } = useSound('notification/completed');

  // Save state to local storage when updated
  useEffect(() => {
    window.localStorage.setItem("verses", JSON.stringify(verses));
  }, [verses]);

  useEffect(() => {
    window.localStorage.setItem("breaks", JSON.stringify(breakList));
  }, [breakList]);

  useEffect(() => {
    window.localStorage.setItem("completedBreaks", JSON.stringify(completedBreaks));
  }, [completedBreaks]);

  useEffect(() => {
    window.localStorage.setItem("completedDaily", JSON.stringify(completedDaily));
  }, [completedDaily]);

  // Update display for timer
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

  // *** Helper functions for Verses ***
  // update verse list 
  const updateVerse = (verseId, newText) => {
    const updatedVerseList = verses.map((verse) => {
      if (verse.id === verseId) {
        verse.text = newText;
      }
      return verse;
    });
    setVerses(updatedVerseList);
  }

  // Reset verses 
  const resetVerses = (dailyOnly) => {
    console.log("resetting verses");
    // reset all verses
    let updatedVerseList = placeholderVerses;
    if (dailyOnly) {
      // if daily only, then keep first verse
      updatedVerseList[0] = verses[0];
    }
    console.log("new verses", updatedVerseList);
    setVerses(updatedVerseList);
  }

  // *** Helper functions for Timer ***
  const setTimer = (minutes) => {
    setTimeRemaining(minutes * 60);
  }

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  }

  // *** Common Helper functions ***
  // Used to update both completed lists (daily and breaks)
  const updateList = (list, item) => {
    let updatedList;
    // If item is already on list, then remove it
    if (list.includes(item)) {
      updatedList = list.filter((listItem) => listItem !== item);
    } else {
      // otherwise, add item to list
      updatedList = [...list, item];
    }
    return updatedList;

  }

  // *** Helper functions for Breaks ***
  const adjustBreakNum = (newNum) => {
    const breaks = [...breakList];
    let nextID = breakList.length + 1;
    while (breaks.length < newNum) {
      breaks.push({ id: nextID, daily: "", prayer: "", movement: "" });
      nextID++;
    }
    while (breaks.length > newNum) {
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

  const toggleBreak = (breakItem) => {
    setCompletedBreaks(updateList(completedBreaks, breakItem));
  }

  const resetBreaks = () => {
    setCompletedBreaks([]);
  }

  // *** Helper functions for Movement ***

  const toggleDaily = (daily) => {
    setCompletedDaily(updateList(completedDaily, daily));
  }

  const resetDaily = () => {
    setCompletedDaily([]);
  }



  return (
    <div className='App'>
      <main>
        <Header mode={mode} setMode={setMode} />
        <Verses mode={mode} verseList={verses} updateVerse={updateVerse} resetVerses={resetVerses} />
        {mode === "session" && <Timer timeRemaining={timeRemaining} toggleTimer={toggleTimer} />}
        {mode === "session" && <TimerButtons setTimer={setTimer} />}
        {mode === "settings" && <BreakSettings breakList={breakList} updateBreak={updateBreak} adjustBreakNum={adjustBreakNum} />}
        {mode === "break" && <BreakView breakList={breakList} completedBreaks={completedBreaks} toggleBreak={toggleBreak} resetBreaks={resetBreaks} />}
        {mode === "movement" && <MovementView completedDaily={completedDaily} toggleDaily={toggleDaily} resetDaily={resetDaily} />}
      </main>

    </div>
  )
}

export default App
