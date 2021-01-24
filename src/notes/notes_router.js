const express = require("express");
const path = require("path");
const xss = require("xss");
const FoldersService = require("../folders/folders_service");
const NotesService = require("./notes_service");


const notesRouter = express.Router();
const jsonBodyParser = express.json();

const serializeNote = note => ({
    id: note.id,
    title: xss(note.title),
    content: xss(note.content),
    date: xss(note.date),
    folder_id: note.folder_id
})

notesRouter
    .route("/")
    .get((req, res, next) => {
        NotesService.getAllNotes(req.app.get("db"))
            .then(notes => {
                res.json(notes);
            })
            .catch(next);
    })
    .post(jsonBodyParser, (req, res, next) => {
        const { title, folder_id, content, date } = req.body;
        const newNote = { title, folder_id: folder_id, content, date };

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
                    .json(serializeNote(note));
            })
            .catch(next);
    });

// notesRouter
//     .route("/:folder_id")
//     .all((req, res, next) => {
//         FoldersService.getById(
//             req.app.get('db'),
//             req.params.folder_id
//         )
//             .then(folder => {
//                 if (!folder) {
//                     return res.status(404).json({
//                         error: { message: 'Folder does Not Exist!' }
//                     })
//                 }
//                 res.folder = folder
//                 next()
//             })
//             .catch(next)
//     })
//     .get((req, res, next) => {
//         NotesService.getFoldersNotes(
//             req.app.get('db'),
//             req.params.folder_id
//         )
//             .then(notes => {
//                 res.json(notes.map(serializeNote))
//             })
//             .catch(next)
//     })


notesRouter
    .route("/:note_id")
    .all((req, res, next) => {
        const { note_id } = req.params;
        NotesService
            .getNoteById(req.app.get("db"), note_id)
            .then((note) => {
                if (!note) {
                    return res
                        .status(404)
                        .json({ error: { message: "Note not found" } });
                }
                res.note = note;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        const { note_id } = req.params;
        NotesService
            .getNoteById(req.app.get("db"), note_id)
            .then(note => {
                res.json(serializeNote(note))
            })
            .catch(next);
    })
    .delete((req, res, next) => {
        const { note_id } = req.params;
        NotesService
            .deleteNote(req.app.get("db"), note_id)
            .then(() => res.status(204).end())
            .catch(next);
    })
    .patch(jsonBodyParser, (req, res, next) => {
        const noteUpdates = req.body;

        if (Object.keys(noteUpdates).length == 0) {
            return res.status(400).json({
                error: { message: `Must include Data!` },
            });
        }
        NotesService
            .updateNote(req.app.get("db"), res.note.id, noteUpdates)
            .then((updatedNote) => res.status(204).end());
    });

module.exports = notesRouter;