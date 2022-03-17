const { DataTypes } = require('sequelize');

const { sequelize } = require('../util/database');

const Movie = sequelize.define('movie', {
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
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 1
  },
  Image: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  genre: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 'active'
  }
});

module.exports = { Movie };
