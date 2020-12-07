const xss = require('xss')

const NotesService = {
    getAllNotes(db) {
        return db('notes')
    },

    getFoldersNotes(db, folder_id) {
        return db
            .from('notes')
            .select('*')
            .where('folder_id', folder_id)
    },

    insertNewNote(db, newNote) {
        return db('notes')
            .insert(newNote)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteNote(db, note_id) {
        return db
            .from('notes')
            .where('note_id', note_id)
            .delete()
    },

    serializeNotes(notes) {
        return notes.map(this.serializeNote)
    }
}

module.exports = NotesService