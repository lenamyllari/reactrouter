import React, {Component} from 'react';
import noteService from '../services/notes'
import Note from './Note'

export default class  List extends Component  {

    state= {
        notes: [],
    };

    componentDidMount() {
        noteService.getAll().then(res=>{
            console.log("get all" + res[1].done);
            this.setState({notes: res})
        })
    };


 render() {
     return (
         <div>
             <h1>Notes</h1>
             <ul>
                 {this.state.notes.map(note =>
                     <Note key={note.id} note={note}/>
                 )}
             </ul>
         </div>
     )
 }
}


