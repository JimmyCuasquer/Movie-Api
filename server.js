const { app } = require('./app');

const { sequelize } = require('./api/utils/database');

sequelize
  .authenticate()
  .then(() => console.log('database authenticated'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('database synced'))
  .catch((err) => console.log(err));

app.listen(4001, () => {
  console.log('express app running');
});
