require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

// import routers
const foldersRouter = require("./folders/folders_router");
const notesRouter = require("./notes/notes_router");

const app = express();
app.use(express.json());

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

const corsOptions = {
    origin: true,
    credentials: true
}
app.options('*', cors(corsOptions)); // preflight OPTIONS; put before other routes

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// mounts endpoints to folders and notes router
app.use("/api/folders", foldersRouter);
app.use("/api/notes", notesRouter);

app.get('/', (req, res) => {
    res.send('Hello, boilerplate!');
});

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } };
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});

module.exports = app;