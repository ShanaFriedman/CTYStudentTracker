import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const AddNotes = ({studentId, onAddNote, notes, onDeleteNote}) => {
    const [note, setNote] = useState('')

    // const onNoteChange = e => {
    //     const copy = {...note}

    // }

    const onSubmitNote = async () => {
        onAddNote(note)
        setNote('')
        // e.preventDefault()
        // await axios.post('/api/students/AddNote', {studentId, text: note})
    }

    const onDeleteNoteClick = (note) => {
        onDeleteNote(note)
    }

    return (<>
    {!!notes.length && <><div className="mt-2">
                        <h4>Notes:</h4>
                    </div>
                        {notes.map(n => <div className="row">
                            <div className="col-md-8 card card-body bg-light">
                                <div className="mt-1">{n.text}</div>
                                <div className="offset-11"><button className="btn btn-danger" onClick={() => onDeleteNoteClick(n)}>Delete</button></div>
                            </div>
                        </div>)}

                    </>}

        <div className="row">
            <div className="col-md-8 card card-body bg-light mt-4">
                {/* <h2>Submit an answer</h2> */}
                
                    <input type="hidden" name="questionid" defaultValue={6} />
                    <textarea
                        className="form-control"
                        placeholder="Add Notes..."
                        rows={5}
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                    <br />
                    <button className="btn btn-dark" onClick={onSubmitNote} disabled={!note.length}>Submit Note</button>
            </div>
        </div>

    </>)
}

export default AddNotes