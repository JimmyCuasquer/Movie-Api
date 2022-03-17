const express = require('express');

const router = express.Router();

const {
    getAllMovies,
    updateMovies,
    deleteMovies,
    createNewMovies
} = require('../controllers/movie.controllers');

// GET fetch all ToDos
router.get('/', getAllMovies);
// POST Create new ToDo
router.post('/', createNewMovies);
// PATCH Update ToDo given an ID
router.patch('/:id', updateMovies);
// DELETE Delete ToDo given an ID (destroy or soft delete)
router.delete('/:id', deleteMovies);

module.exports = { moviesRouter: router };
