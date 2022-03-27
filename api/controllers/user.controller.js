//models
const { User } = require('../models/user.model');
const { catchAsync } = require('../utils/catchAsync');

//utils
const { filterObj } = require('../utils/filterObj');

exports.getAllUsers = catchAsync(async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) {
      res
        .status(404)
        .json({ status: 'error', message: 'Not found Id in the database' });
    }
    res.status(200).json({ status: 'success', data: { users } });
  } catch (error) {
    console.log(error);
  }
});
exports.getUsersById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    res.status(400).json({ status: 'error', message: 'User not found' });
  }
  res.status(200).json({ status: 'success', data: { user } });
}); 
exports.createNewUsers = catchAsync(async (req, res) => {
 
    const { username, email, password, role } = req.body;
    
    const newUser = await User.create({
      username,
      email,
      password,
      role
    });
    //console.log(newUser);
    res.status(201).json({ status: 'success', data: { newUser } });
});
exports.updateUsers = catchAsync(async (req, res) => {
 
    const { id } = req.params;
    const data = filterObj(req.body, 'username', 'email');
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      res
        .status(404)
        .json({ status: 'error', message: 'Cant update user, Invalid ID' });
      return;
    }
    await User.update({ ...data });
    res.status(204).json({ status: 'success' });
});
exports.deleteUsers = catchAsync(async (req, res) => {
  
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
});
