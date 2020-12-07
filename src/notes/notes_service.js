const xss = require('xss')

const NotesService = {
    getAllNotes(db) {
        return db('noteful_notes')
    },

    insertNewNote(db, newNote) {
        return db('noteful_notes')
            .insert(newNote)
            .returning('*')
            .then(([note]) => note)
    },

    deleteNote(db, note_id) {
        return db
            .from('noteful_notes')
            .where('id', note_id)
            .delete()
    },

    serializeNotes(notes) {
        return notes.map(this.serializeNote)
    },

    serializeNote(note) {
        return {
            id: String(note.id),
            name: xss(note.name),
            modified: note.modified,
            content: xss(note.content),
            folderId: String(note.folder_id)
        }
    }
}

module.exports = NotesService