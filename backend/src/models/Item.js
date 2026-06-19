const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Item = sequelize.define('Item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'lost' },
  category: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'lost' },
  description: { type: DataTypes.TEXT },
  reportedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  date: { type: DataTypes.DATEONLY },
  reporter: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
});

module.exports = Item;
