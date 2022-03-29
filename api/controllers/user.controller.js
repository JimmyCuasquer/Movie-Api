const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
//models
const { User } = require('../models/user.model');

//utils
const { filterObj } = require('../utils/filterObj');
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });
exports.loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: 'active' } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ status: 'error', message: 'credentials invalid' });
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED
  });

  res.status(200).json({ status: 'success', data: { token } });
});
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password'] }
  });

  if (!users) {
    res
      .status(404)
      .json({ status: 'error', message: 'Not found Id in the database' });
  }
  res.status(200).json({ status: 'success', data: { users } });
});
exports.getUsersById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] }
  });
  if (!user) {
    res.status(400).json({ status: 'error', message: 'User not found' });
  }
  res.status(200).json({ status: 'success', data: { user } });
});
exports.createNewUsers = catchAsync(async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const passEncritpted = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    username,
    email,
    password: passEncritpted
  });
  console.log(newUser);
  newUser.password = undefined;
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
