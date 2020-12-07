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

    serializeFolders(folders) {
        return folders.map(this.serializeFolder)
    },

    serializeFolder(folder) {
        return {
            folder_id: String(folder.folder_id),
            name: xss(folder.name)
        }
    }
}

module.exports = FoldersService
