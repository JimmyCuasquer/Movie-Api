//models
const { Movie } = require('../models/movie.model');

//utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllMovies = catchAsync(async (req, res) => {
  const movieDb = await Movie.findAll();

  if (!movieDb) {
    res
      .status(404)
      .json({ status: 'error', message: 'Not found Id in the database' });
  }
  res.status(200).json({ status: 'success', data: { movies: movieDb } });
});
exports.getMovieById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findOne({ where: { id } });
  if (!movie) {
    res.status(400).json({ status: 'error', message: 'Movie  not found' });
  }
  res.status(200).json({ status: 'success', data: { movie } });
});
exports.createNewMovies = catchAsync(async (req, res) => {
  const { title, description, duration, rating, Image, genre } = req.body;

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    Image,
    genre
  });
  res.status(201).json({ status: 'success', data: { newMovie } });
});
exports.updateMovies = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = filterObj(req.body, 'title', 'description', 'duration', 'genre');
  const movie = await Movie.findOne({ where: { id: id } });
  if (!movie) {
    res
      .status(404)
      .json({ status: 'error', message: 'Cant update movie, Invalid ID' });
    return;
  }
  await Movie.update({ ...data });
  res.status(204).json({ status: 'success' });
});
exports.deleteMovies = catchAsync(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findOne({ where: { id } });
  //const todoIndex = todos.findIndex((todo) => todo.id === +id);
  if (!movie) {
    res
      .status(404)
      .json({ status: 'error', message: 'Cant delete movie Invalid ID' });
    return;
  }
  await movie.destroy();
  //posts.splice(todoIndex, 1);
  res.status(204).json({ status: 'success' });
});
