import React from 'react'

const Note = ({ note }) => {
    return (
        <li>{note.course}: {note.task},
            deadline: {note.date.toString()},
            {note.done===true  && <p>done: yes</p>}
            {note.done===false && <p>done: no</p>}
           </li>
    )
}

export default Note
