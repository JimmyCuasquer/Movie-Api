//models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
//utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllActors = catchAsync(async (req, res) => {
  const actor = await Actor.findAll({
    where: { status: 'active' },
    include: [{ model: Movie, through: ActorInMovie }]
  });
  if (!actor) {
    res
      .status(404)
      .json({ status: 'error', message: 'Not found Id in the database' });
  }
  res.status(200).json({ status: 'success', data: { actors: actor } });
});
exports.getActorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id } });
  if (!actor) {
    res.status(400).json({ status: 'error', message: 'Actor  not found' });
  }
  res.status(200).json({ status: 'success', data: { actor } });
});
exports.createNewActor = catchAsync(async (req, res) => {
  const { name, country, rating, age, profilePic } = req;
  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilePic
  });
  res.status(201).json({ status: 'success', data: { newActor } });
});
exports.updateActor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = filterObj(req.body, 'name', 'country', 'age');
  const actor = await Actor.findOne({ where: { id: id } });
  if (!actor) {
    res
      .status(404)
      .json({ status: 'error', message: 'Cant update actor, Invalid ID' });
    return;
  }
  await Actor.update({ ...data });
  res.status(204).json({ status: 'success' });
});
exports.deleteActor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const actor = await Actor.findOne({ where: { id } });
  //const todoIndex = todos.findIndex((todo) => todo.id === +id);
  if (!actor) {
    res
      .status(404)
      .json({ status: 'error', message: 'Cant delete actor Invalid ID' });
    return;
  }
  await actor.destroy();
  //posts.splice(todoIndex, 1);
  res.status(204).json({ status: 'success' });
});
