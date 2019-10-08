import React from 'react';
import ApiContext from '../ApiContext';
import NotefulForm from '../NotefulForm/NotefulForm'


export default class AddNote extends React.Component{
    static contextType = ApiContext;
    handleAddNote=(e)=>{
        e.preventDefault();
        const note = {
            name: e.target['noteName'].value,
            content: e.target['noteContent'].value,
            folderid: e.target['folderSelect'].value,
            modified: new Date()
    }
    
    console.log(note)
    
        fetch ('https://whispering-harbor-90519.herokuapp.com/api/notes',{
            method: 'POST',
            headers: {'content-type': 'application/JSON'},
            body: JSON.stringify(note)
        })
        .then(res => {
            if( res.ok) return res.json();
        })
        .then(note => {
            this.props.history.push(`/`)
            this.context.AddNote(note)
        })
        .catch(error => console.log(error.message))
        }
        render(){
            const {folders = []} = this.context
            return(
                <div>
                    <h2>Create a Note</h2>
                <NotefulForm onSubmit={this.handleAddNote}>
                    <label htmlFor="noteName">Name</label>
                    <input type="text" id="noteName" required></input>
                    <label htmlFor="noteContent" >Content</label>
                    <input type="text" id="noteContent" required></input>
                    <label htmlFor="noteFolder">Folder</label>
                    <select id="folderSelect">
                        {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                    <button type="submit">Add Note</button>
                </NotefulForm>
                </div>
            )
        }
}