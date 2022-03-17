//models
const { Movie } = require('../models/movies.model');

//utils
const { filterObj } = require('../util/filterObj');

exports.getAllMovies = async (req, res) => {
  try {
    const movieDb = await Movie.findAll();

    if (!movieDb) {
      res
        .status(404)
        .json({ status: 'error', message: 'Not found Id in the database' });
    }
    res.status(200).json({ status: 'success', data: { movies: movieDb } });
  } catch (error) {
    console.log(error);
  }
};
exports.createNewMovies = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
exports.updateMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(
      req.body,
      'title',
      'description',
      'duration',
      'rating',
      'Image',
      'genre'
    );
    const movie = await Movie.findOne({ where: { id: id } });
    if (!movie) {
      res
        .status(404)
        .json({ status: 'error', message: 'Cant update movie, Invalid ID' });
      return;
    }
    await Movie.update({ ...data });
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteMovies = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
