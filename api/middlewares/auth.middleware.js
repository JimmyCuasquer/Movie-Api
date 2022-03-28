const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');
const { catchAsync } = require('../utils/catchAsync');
dotenv.config({ path: './config.env' });
exports.validateSession = catchAsync( async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(400).json({ status: 'error', message: 'Invalid session token' });
  }

  const validToken = promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!validToken) {
    res.status(401).json({ status: 'error', message: 'Invalid session token' });
  }
  next();
});
