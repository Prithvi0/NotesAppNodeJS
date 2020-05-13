const Note = require('../models/note.model.js');

// create and save a new Note
exports.create = (request, response) => {
    // validate request
    if (!request.body.content) {
        return response.status(400).send({
            message: 'Note content can not be empty'
        });
    }

    // create a Note
    const note = new Note({
        title: request.body.title || 'Untitled Note',
        content: request.body.content
    });

    // save Note in the database
    note.save()
        .then(data => {
            response.send(data);
        }).catch(error => {
            response.status(500).send({
                message: error.message || 'Some error occurred while creating the Note.'
            });
        });
};

// retrieve and return all notes from the database
exports.findAll = (request, response) => {
    Note.find()
    .then(notes => {
        response.send(notes);
    }).catch(error => {
        response.status(500).send({
            message: error.message || 'Some error occurred while retrieving notes.'
        });
    });
};

// find a single note with a noteId
exports.findOne = (request, response) => {
    Note.findById(request.params.noteId)
    .then(note => {
        if (!note) {
            return response.status(404).send({
                message: 'Note not found with id ' + request.params.noteId
            });
        }
        response.send(note);
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return response.status(404).send({
                message: 'Note not found with id ' + request.params.noteId
            });
        }
        return response.status(500).send({
            message: 'Error retrieving note with id ' + request.params.noteId
        });
    });
};

// update a note identified by the noteId in the request
exports.update = (request, response) => {
    // validate request
    if (!request.body.content) {
        return response.status(400).send({
            message: 'Note content cn not be empty'
        });
    }

    // find note and update it with the request body
    Note.findByIdAndUpdate(request.params.noteId, {
        title: request.body.title || 'Untitled Note',
        content: request.body.content
    }, { new: true })
    .then(note => {
        if (!note) {
            return response.status(404).send({
                message: 'Note not found with id ' + request.params.noteId
            });
        }
        response.send(note);
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return response.status(404).send({
                message: 'Note not found with id ' + request.params.noteId
            });
        }
        return response.status(500).send({
            message: 'Error updating note with id ' + response.params.noteId
        });
    });
};

// delete a note with the specified noteId in the request
exports.delete = (request, response) => {
    Note.findByIdAndRemove(request.params.noteId)
    .then(note => {
        if (!note) {
            return response.status(404).send({
                message: 'Note not found with id ' + request.params.noteId
            });
        }
        response.send({ message: 'Note deleted successfully!' });
    }).catch(error => {
        if (error.kind === 'ObjectId' || error.ame === 'NotFound') {
            return response.status(404).send({
                message: 'Note not found with id ' + request.params.noteId
            });
        }
        return response.status(500).send({
            message: 'Could not delete note with id ' + request.params.noteId
        });
    });
};