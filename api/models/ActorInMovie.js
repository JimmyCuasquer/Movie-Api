const { DataTypes } = require('sequelize');

const { sequelize } = require('../util/database');

const ActorInMovie = sequelize.define('actorinmovie', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  actorId: {
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  movieId: {
    type: DataTypes.INTEGER,
    autoIncrement: true
  }
});

module.exports = { ActorInMovie };
