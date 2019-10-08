/* eslint-disable eqeqeq */

export const findFolder = (folders=[], folderid) =>
  folders.find(folder => folder.id === folderid)

export const findNote = (notes=[], id) =>
  notes.find(note => note.id == id)

export const getNotesForFolder = (notes=[], folderid) => {
  return (!folderid) ? notes : notes.filter(note => note.folderid == folderid)
}

export const countNotesForFolder = (notes=[], folderid) =>
  notes.filter(note => note.folderid === folderid).length
