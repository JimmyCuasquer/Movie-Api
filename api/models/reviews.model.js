const { DataTypes } = require('sequelize');

const { sequelize } = require('../util/database');

const MovieReviews = sequelize.define('reviews', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  rating: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 1
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { MovieReviews };
