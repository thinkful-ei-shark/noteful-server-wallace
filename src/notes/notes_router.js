const express = require("express");
const path = require("path");
const xss = require("xss");
const FoldersService = require("../folders/folders_service");
const NotesService = require("./notes_service");


const notesRouter = express.Router();
const jsonBodyParser = express.json();

// sanitizing method in service
const serializeNote = note => ({
    note_id: note.note_id,
    name: xss(note.name),
    content: xss(note.content),
    folder_id: note.folder_id
})

notesRouter
    .route("/")
    .get((req, res, next) => {
        NotesService.getAllNotes(req.app.get("db"))
            .then(notes => {
                res.json(NotesService.serializeNotes(notes));
            })
            .catch(next);
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { name, folder_id, content } = req.body;
        const newNote = { name, folder_id: folder_id, content };

        for (const [key, value] of Object.entries(newNote))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                });

        NotesService.insertNewNote(req.app.get("db"), newNote)
            .then(note => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.note_id}`))
                    .json(serializeNote(note));
            })
            .catch(next);
    });

notesRouter
    .route("/:folder_id")
    .all((req, res, next) => {
        FoldersService.getById(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: { message: 'Folder does Not Exist!' }
                    })
                }
                res.folder = folder
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        NotesService.getFoldersNotes(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(notes => {
                res.json(notes.map(serializeNote))
            })
            .catch(next)
    })


notesRouter
    .route("/:note_id")
    .delete((req, res, next) => {
        NotesService.deleteNote(req.app.get("db"), req.params.note_id)
            .then(() => {
                res.status(204).end();
            })
            .catch(next);
    });

module.exports = notesRouter;