
function Verse({ verse, isEditMode, updateVerse }) {

    const handleChange = (e) => {
        updateVerse(verse.id, e.target.value);
    }

    return (
        <>
            {isEditMode ?
                <textarea id={verse.id} className="edit-verse" value={verse.text} placeholder={verse.placeholder} onChange={handleChange}></textarea> :
                <p className="verse">{verse.text}</p>}
        </>
    )
}

export default function Verses({ mode, verseList, updateVerse }) {
    const isEditMode = mode === "settings";

    return (
        <>
            {mode === "session" ?
                // For session mode, just display first verse
                (<Verse key={verseList[0].id} verse={verseList[0]} isEditMode={false} />) :
                // Break or settings mode, display all verses
                <div>
                    {verseList.map(verse => <Verse key={verse.id} verse={verse} isEditMode={isEditMode} updateVerse={updateVerse} />)}

                    {isEditMode && <div className="button-container">
                        <button className="reset-btn" onClick={() => resetVerses(true)}>Reset Daily</button>
                        <button className="reset-btn" onClick={() => resetVerses(false)}>Reset All</button>
                    </div>
                    }
                </div>
            }
        </>
    )
}

// export default function Verses({ mode, verseList, isEditMode, updateVerse, resetVerses }) {
//     return (
//         <div>
//             {verseList.map(verse => <Verse key={verse.id} verse={verse} isEditMode={isEditMode} updateVerse={updateVerse} />)}

//             {isEditMode && <div className="button-container">
//                 <button className="reset-btn" onClick={() => resetVerses(true)}>Reset Daily</button>
//                 <button className="reset-btn" onClick={() => resetVerses(false)}>Reset All</button>
//             </div>
//             }
//         </div>
//     )
// }