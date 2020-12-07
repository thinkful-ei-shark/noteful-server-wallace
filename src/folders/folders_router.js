const express = require("express");
const path = require('path');
const FoldersService = require("./folders_service");

const foldersRouter = express.Router();
const jsonBodyParser = express.json();

foldersRouter
    .route("/")
    .get((req, res, next) => {
        FoldersService.getAllFolders(req.app.get("db"))
            .then(folders => {
                res.json(FoldersService.serializeFolders(folders));
            })
            .catch(next);
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { name } = req.body;

        if (name == null) {
            return res.status(400).json({
                error: 'Missing "name" in request body'
            })
        }

        FoldersService.insertNewFolder(req.app.get('db'), { name })
            .then(folder => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${folder.folder_id}`))
                    .json(FoldersService.serializeFolder(folder))
            })
            .catch(next)
    })

module.exports = foldersRouter;