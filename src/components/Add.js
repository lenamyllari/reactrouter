import React, { useState }  from 'react'
import noteService from '../services/notes'
import DatePicker from'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const Add =()=>  {

    const date = moment().toDate()

    const [newCourse, setNewCourse] = useState('')
    const [newTask, setNewTask] = useState('')
    const [newDone, setNewDone] = useState(false)
    const [newDeadline, setNewDeadline] = useState(date)

    const handleSubmit = (event) => {
        event.preventDefault()
        const id = getId();

        const noteObject = {
            course: newCourse,
            task: newTask,
            done: newDone,
            date: newDeadline.toLocaleDateString(),
            id: id,
        }
        noteService.create(noteObject).then(res=>{
            setNewCourse('')
            setNewTask('')
            setNewDone(false)
            setNewDeadline(date)
        })

    };


    const getId=()=>{
        noteService.getAll().then(res=>{
            return res.length+1
        });
    }

    const handleCourseChange=(event)=> {
        setNewCourse(event.target.value)
    }

    const handleTaskChange= (event)=> {
        setNewTask(event.target.value)
    }

    const handleDoneChange = (event) => {
        setNewDone(Boolean(event.target.value))
    }

    const handleDeadlineChange = (value) => {
        setNewDeadline(value)
    }

    return (

            <div className="container">
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Course
                            <input name="course" value={newCourse}  onChange={handleCourseChange}/>
                        </label>
                        <label> Task
                            <input name="task"  value={newTask} onChange={handleTaskChange}/>
                        </label>
                        <label>Deadline
                            <DatePicker
                                name="deadline"
                                selected = {newDeadline}

                                onChange={handleDeadlineChange}
                                value={newDeadline}
                                dateFormat="MM/dd/yyyy"
                            />
                        </label>
                        <label>Done
                            <select name="done" value={newDone} onChange={handleDoneChange}>
                                <option value="true">true</option>

                                <option value="false">false</option>

                            </select>
                        </label>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        )

}


export default Add;
