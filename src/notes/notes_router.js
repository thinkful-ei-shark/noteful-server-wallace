const express = require("express");
const path = require("path");
const NotesService = require("./notes_service");

const notesRouter = express.Router();
const jsonBodyParser = express.json();

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
        const { name, folderId, modified, content } = req.body;
        const newNote = { name, folder_id: folderId, modified, content };

        for (const [key, value] of Object.entries(newNote))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                });

        NotesService.insertNewNote(req.app.get("db"), newNote)
            .then(note => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.id}`))
                    .json(NotesService.serializeNote(note));
            })
            .catch(next);
    });

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