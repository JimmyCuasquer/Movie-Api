// Create server Express
const express = require('express');
const {usersRouter} = require('./routes/users.routes');

const app = express();
//app.use(express.json());

app.use('/api/v1/users', usersRouter);
module.exports = { app };
