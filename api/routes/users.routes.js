const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
  createNewUsers,
  loginUser
} = require('../controllers/user.controller');

const { validateSession } = require('../middlewares/auth.middleware');


router.post('/', createNewUsers);

router.post('/login', loginUser);

router.get('/', validateSession, getAllUsers);

router.get('/:id', validateSession, getUsersById);


router.patch('/:id', validateSession, updateUsers);

router.delete('/:id', validateSession, deleteUsers);



module.exports = { usersRouter: router };
