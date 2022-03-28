const express = require('express');

const router = express.Router();

const {
  getAllMovies,
  updateMovies,
  deleteMovies,
  createNewMovies,
  getMovieById
} = require('../controllers/movie.controllers');

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createNewMovies);

router.patch('/:id', updateMovies);

router.delete('/:id', deleteMovies);

module.exports = { moviesRouter: router };
