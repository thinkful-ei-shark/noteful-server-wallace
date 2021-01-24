const xss = require('xss')

const FoldersService = {
    getAllFolders(db) {
        return db
            .select('*')
            .from('folders')
    },

    getById(db, id) {
        return db
            .from('folders')
            .select('*')
            .where('id', id)
            .first()
    },

    insertNewFolder(db, newFolder) {
        return db
            .insert(newFolder)
            .into('folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteFolder(db, id) {
        return db
            .from("folders")
            .where("id", id)
            .delete();
    },

    updatefolder(db, id, folder) {
        return db
            .from("folders")
            .where("id", id)
            .update(folder);
    },
}

module.exports = FoldersService
