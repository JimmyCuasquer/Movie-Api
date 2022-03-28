const express = require('express');

const router = express.Router();

const {
  getAllMovies,
  updateMovies,
  deleteMovies,
  createNewMovies,
  getMovieById
} = require('../controllers/movie.controllers');
const {validateSession} = require('../middlewares/auth.middleware')

router.get('/',validateSession, getAllMovies);

router.get('/:id',validateSession, getMovieById);

router.post('/', createNewMovies);

router.patch('/:id',validateSession, updateMovies);

router.delete('/:id', validateSession,deleteMovies);

module.exports = { moviesRouter: router };
