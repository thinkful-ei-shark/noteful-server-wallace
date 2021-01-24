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
            .where('folder_id', id)
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
}

module.exports = FoldersService
