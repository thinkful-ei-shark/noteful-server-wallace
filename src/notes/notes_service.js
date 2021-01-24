const xss = require('xss')

const NotesService = {
    getAllNotes(db) {
        return db('notes')
    },

    getNoteById(db, id) {
        return db.from("notes").where("id", id).first();
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

    deleteNote(db, id) {
        return db
            .from('notes')
            .where('id', id)
            .delete()
    },

    updateNote(db, id, note) {
        return db.from("notes").where("id", id).update(note);
    },

    serializeNotes(notes) {
        return notes.map(this.serializeNote)
    }
}

module.exports = NotesService