const express = require('express');

const router = express.Router();

const {
    getAllUsers,
    updateUsers,
    deleteUsers,
    createNewUsers
} = require('../controllers/user.controller');

// GET fetch all ToDos
router.get('/', getAllUsers);
// POST Create new ToDo
router.post('/', createNewUsers);
// PATCH Update ToDo given an ID
router.patch('/:id', updateUsers);
// DELETE Delete ToDo given an ID (destroy or soft delete)
router.delete('/:id', deleteUsers);

module.exports = { usersRouter: router };
