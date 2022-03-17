//models
const { User } = require('../models/user.model');

//utils
const { filterObj } = require('../util/filterObj');

exports.getAllUsers = async (req, res) => {
  try {
    const userDb = await User.findAll();

    if (!userDb) {
      res
        .status(404)
        .json({ status: 'error', message: 'Not found Id in the database' });
    }
    res.status(200).json({ status: 'success', data: { users: userDb } });
  } catch (error) {
    console.log(error);
  }
};
exports.createNewUsers = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
      role
    });
    res.status(201).json({ status: 'success', data: { newUser } });
  } catch (error) {
    console.log(error);
  }
};
exports.updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = filterObj(
      req.body,
      'username',
      'email',
      'password',
      'role'
   );
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      res
        .status(404)
        .json({ status: 'error', message: 'Cant update user, Invalid ID' });
      return;
    }
    await User.update({ ...data });
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUsers= async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    //const todoIndex = todos.findIndex((todo) => todo.id === +id);
    if (!user) {
      res
        .status(404)
        .json({ status: 'error', message: 'Cant delete user Invalid ID' });
      return;
    }
    await user.destroy();
    //posts.splice(todoIndex, 1);
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
