const express = require('express');

const router = express.Router();

const {
  getAllActors,
  updateActor,
  deleteActor,
  createNewActor,
  getActorById
} = require('../controllers/actor.controller');
const {validateSession} = require('../middlewares/auth.middleware')

router.get('/',validateSession, getAllActors);

router.get('/:id',validateSession, getActorById);

router.post('/', createNewActor);

router.patch('/:id',validateSession, updateActor);

router.delete('/:id',validateSession, deleteActor);

module.exports = { actorsRouter: router };
