import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import FoldersError from '../FoldersError'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        error: false
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/notes`),
            fetch(`${config.API_ENDPOINT}/api/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };
    
    renderNavRoutes() {
        const { folders = []} = this.state
        if (folders.length === 0){
            return(
                <React.Fragment>
                {['/', '/folder/:id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:id" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />

            </React.Fragment>
            )
        }else{
        return (
            <React.Fragment>
                {['/', '/folder/:id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:id" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </React.Fragment>
        );
                }
    }

    renderMainRoutes() {
        const { folders = []} = this.state
        if (folders.length === 0){
        return (
            <React.Fragment>
                <Route path="/add-folder" component={AddFolder} />
                <p> Add a folder to add a note</p>
            </React.Fragment>
        );
                }else{
                    return (
                        <React.Fragment>
                            {['/', '/folder/:id'].map(path => (
                                <Route
                                    exact
                                    key={path}
                                    path={path}
                                    component={NoteListMain}
                                />
                            ))}
                            <Route path="/note/:id" component={NotePageMain} />
                            <Route path="/add-folder" component={AddFolder} />
                            <Route path="/add-note" component={AddNote} />
                        </React.Fragment>
                    );
                }
    }
    HandleAddFolder=(folder)=>{
        this.setState({
            folders: [...this.state.folders, folder],
            
        })

    }
    HandleAddNote=(note)=>{
        this.setState({
            notes: [...this.state.notes, note],
            
        })

    }

    HandleSetError=(error)=>{
        this.setState({
            error: error
        })
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            AddFolder: this.HandleAddFolder,
            AddNote: this.HandleAddNote,
            setError: this.HandleSetError,
            error: this.state.error
        };
        return (
            <ApiContext.Provider value={value}>
                <FoldersError>
                    <div className="App">
                        <nav className="App__nav">{this.renderNavRoutes()}</nav>
                        <header className="App__header">
                            <h1>
                                <Link to="/">Noteful</Link>{' '}
                                <FontAwesomeIcon icon="check-double" />
                            </h1>
                        </header>
                        <main className="App__main">{this.renderMainRoutes()}</main>
                    </div>
                </FoldersError>
            </ApiContext.Provider>
        );
    }
}

export default App;
