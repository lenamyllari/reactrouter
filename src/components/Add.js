import React, { useState }  from 'react'
import noteService from '../services/notes'
import DatePicker from'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const Add =()=>  {

    const date = moment().toDate();

    const [newCourse, setNewCourse] = useState('');
    const [newTask, setNewTask] = useState('');
    const [newDone, setNewDone] = useState(false);
    const [newDeadline, setNewDeadline] = useState(date);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(newCourse.length===0 || newTask.length===0){
            setError(true)
        }
        else {
            setError(false);
            setSuccess(true);
            console.log(success)
            const id = getId();

            const noteObject = {
                course: newCourse,
                task: newTask,
                done: newDone,
                date: newDeadline.toLocaleDateString(),
                id: id,
            };
            noteService.create(noteObject).then(res => {
                setNewCourse('');
                setNewTask('');
                setNewDone(false);
                setNewDeadline(date)
            })
        }
    };


    const getId=()=>{
        noteService.getAll().then(res=>{
            return res.length+1
        });
    };

    const handleCourseChange=(event)=> {
        setNewCourse(event.target.value)
    };

    const handleTaskChange= (event)=> {
        setNewTask(event.target.value)
    };

    const handleDoneChange = (event) => {
        setNewDone(Boolean(event.target.value))
    };

    const handleDeadlineChange = (value) => {
        setNewDeadline(value)
    };

    const errorCourse=()=>{
        return newCourse.length === 0 && error===true
    };

    const errorTask =() => {
        return newTask.length === 0 && error===true
    };

    const errorStyle ={
        color: 'red'
    };

    const successStyle ={
        color: 'green'
    };

    return (

            <div className="container">
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Course
                            <input name="course" value={newCourse}  onChange={handleCourseChange}/>
                        </label>
                        {errorCourse() && <p style={errorStyle}>Fill in the course name, please</p>}
                        <label> Task
                            <input name="task"  value={newTask} onChange={handleTaskChange}/>
                        </label>
                        {errorTask() && <p style={errorStyle}>Fill in the task, please</p>}
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
                    {success && <p style={successStyle}>Data saved successfully!</p>}
                </div>
            </div>
        )

};


export default Add;
