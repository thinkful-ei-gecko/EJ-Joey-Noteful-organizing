import React from 'react';
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext';

export default class AddFolder extends React.Component{
    static contextType = ApiContext;
    handleAddFolder=(e)=>{
        e.preventDefault();
        const folder = {name: e.target['folderInput'].value}
        console.log(folder)
        fetch ('http://localhost:9090/folders',{
            method: 'POST',
            headers: {'content-type': 'application/JSON'},
            body: JSON.stringify(folder)
        })
        .then(res => {
            if( res.ok) return res.json();
        })
        .then(folder => {
            this.props.history.push('/')
            this.context.AddFolder(folder)
        })
        }
    render(){
        return(
            <div className="">
                <h2>Create A Folder</h2>
                <NotefulForm onSubmit={this.handleAddFolder}>
                <div> 
                    <label htmlFor="folderInput">
                       name
                    </label>
                    <input type="text" id="folderInput"></input>

                <button type="submit">Add Folder</button>
                
                </div>
                </NotefulForm>
            </div>
        )
    }
}