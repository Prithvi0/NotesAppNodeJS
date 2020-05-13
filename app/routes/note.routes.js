module.exports = app => {
    const notes = require('../controllers/note.controllers.js');

    // creating a new note
    app.post('/notes', notes.create);

    // retreiving all notes
    app.get('/notes', notes.findAll);

    // retrieving a single note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // updating a note with noteId
    app.put('/notes/:noteId', notes.update);

    // deleting a note with noteId
    app.delete('/notes/:noteId', notes.delete);
}