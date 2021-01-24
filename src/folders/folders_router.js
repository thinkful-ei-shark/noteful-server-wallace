const express = require("express");
const path = require('path');
const xss = require("xss");
const FoldersService = require("./folders_service");

const foldersRouter = express.Router();
const jsonBodyParser = express.json();

const serializeFolder = (folder) => ({
    id: folder.id,
    name: xss(folder.name),
});

foldersRouter
    .route("/")
    .get((req, res, next) => {
        FoldersService.getAllFolders(req.app.get("db"))
            .then(folders => res.json(folders.map(serializeFolder)))
            .catch(next);
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { name } = req.body;

        if (name == null) {
            return res.status(400).json({
                error: 'Missing "name" in request body'
            })
        }

        const newFolder = {
            name: xss(name)
        }
        FoldersService.insertNewFolder(req.app.get('db'), newFolder)
            .then(folder => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder.id}`))
                    .json((folder))
            })
            .catch(next)
    })

foldersRouter
    .route("/:folder_id")
    .all((req, res, next) => {
        const { folder_id } = req.params;
        FoldersService
            .getById(req.app.get("db"), folder_id)
            .then(folder => {
                if (!folder) {
                    return res
                        .status(404)
                        .json({ error: { message: "folder not found" } });
                }
                res.folder = folder;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        const folder = res.folder;
        res.json(serializeFolder(folder));
    })
    .delete((req, res, next) => {
        const { folder_id } = req.params;
        FoldersService
            .deleteFolder(req.app.get("db"), folder_id)
            .then(() => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonBodyParser, (req, res, next) => {
        const folderUpdates = req.body;

        if (Object.keys(folderUpdates).length == 0) {
            return res.status(400).json({
                error: { message: `patch request must supply values` },
            });
        }
        FoldersService
            .updatefolder(req.app.get("db"), res.folder.id, folderUpdates)
            .then((updatedfolder) => {
                res.status(204).end();
            });
    });


module.exports = foldersRouter;