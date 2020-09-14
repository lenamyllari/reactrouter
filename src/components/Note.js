import React from 'react'

const Note = ({ note }) => {
    return (
        <li>{note.course}: {note.task}, deadline: {note.date}, done: {(note.done).toString()}</li>
    )
}

export default Note
