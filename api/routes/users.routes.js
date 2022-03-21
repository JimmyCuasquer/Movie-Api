const express = require('express');

const router = express.Router();

const {
    getAllUsers,
    getUsersById,
    updateUsers,
    deleteUsers,
    createNewUsers
} = require('../controllers/user.controller');

router.get('/', getAllUsers);
router.get('/:id', getUsersById);
router.post('/', createNewUsers);
router.patch('/:id', updateUsers);
router.delete('/:id', deleteUsers);

module.exports = { usersRouter: router };
