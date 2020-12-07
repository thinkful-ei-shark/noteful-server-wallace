const xss = require('xss')

const NotesService = {
    getAllNotes(db) {
        return db('notes')
    },

    insertNewNote(db, newNote) {
        return db('notes')
            .insert(newNote)
            .returning('*')
            .then(([note]) => note)
    },

    deleteNote(db, note_id) {
        return db
            .from('notes')
            .where('id', note_id)
            .delete()
    },

    serializeNotes(notes) {
        return notes.map(this.serializeNote)
    },

    // sanitizing method in service
    serializeNote(note) {
        return {
            id: String(note.id),
            name: xss(note.name),
            content: xss(note.content),
            folder_id: String(note.folder_id)
        }
    }
}

module.exports = NotesService