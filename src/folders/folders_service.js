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
            .returning('*')
            .then(([folder]) => folder)
    },

    serializeFolders(folders) {
        return folders.map(this.serializeFolder)
    },

    serializeFolder(folder) {
        return {
            id: String(folder.id),
            name: xss(folder.name)
        }
    }
}

module.exports = FoldersService
