const express = require('express');

const router = express.Router();

const {
    getAllActors,
    updateActor,
    deleteActor,
  createNewActor
} = require('../controllers/actor.controller');

// GET fetch all ToDos
router.get('/', getAllActors);
// POST Create new ToDo
router.post('/', createNewActor);
// PATCH Update ToDo given an ID
router.patch('/:id', updateActor);
// DELETE Delete ToDo given an ID (destroy or soft delete)
router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };
