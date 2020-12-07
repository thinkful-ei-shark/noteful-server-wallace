const xss = require('xss')

const FoldersService = {
    getAllFolders(db) {
        return db
            .select('*')
            .from('folders')
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
            id: String(folder.folder_id),
            name: xss(folder.name)
        }
    }
}

module.exports = FoldersService
