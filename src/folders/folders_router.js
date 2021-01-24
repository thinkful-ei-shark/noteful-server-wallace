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

module.exports = foldersRouter;