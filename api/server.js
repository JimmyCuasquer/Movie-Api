const { app } = require('./app');

const { sequelize } = require('./utils/database');
const { initModels } = require('./utils/initModels');


sequelize
  .authenticate()
  .then(() => console.log('database authenticated'))
  .catch((err) => console.log(err));

initModels();

  sequelize
  .sync()
  .then(() => console.log('database synced'))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`express app running on port ${PORT}`);
});
