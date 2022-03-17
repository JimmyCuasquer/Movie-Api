//models
const { Actor } = require('../models/actor.model');

//utils
const { filterObj } = require('../util/filterObj');

exports.getAllActors = async (req, res) => {
  try {
    const actorDb = await Actor.findAll();

    if (!actorDb) {
      res
        .status(404)
        .json({ status: 'error', message: 'Not found Id in the database' });
    }
    res.status(200).json({ status: 'success', data: { todos: actorDb } });
  } catch (error) {
    console.log(error);
  }
};
exports.createNewActor = async (req, res) => {
  try {
    const { name, country, rating, age, profilePic } = req.body;
    const newActor = await Actor.create({
      name,
      country,
      rating,
      age,
      profilePic
    });
    res.status(201).json({ status: 'success', data: { newActor } });
  } catch (error) {
    console.log(error);
  }
};
exports.updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(
      req.body,
      'name',
      'country',
      'rating',
      'age',
      'profilePic'
    );
    const actor = await Actor.findOne({ where: { id: id } });
    if (!actor) {
      res
        .status(404)
        .json({ status: 'error', message: 'Cant update actor, Invalid ID' });
      return;
    }
    await Todo.update({ ...data });
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteActor = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
