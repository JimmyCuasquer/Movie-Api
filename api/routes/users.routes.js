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

const {validateSession} = require('../middlewares/auth.middleware')



router.get('/',validateSession, getAllUsers);

router.get('/:id',validateSession, getUsersById);

router.post('/', createNewUsers);

router.patch('/:id',validateSession, updateUsers);

router.delete('/:id', validateSession,deleteUsers);

router.post('/login', loginUser)

module.exports = { usersRouter: router };
