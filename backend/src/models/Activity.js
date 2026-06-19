const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Item = require('./Item');

const Activity = sequelize.define('Activity', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  action: { type: DataTypes.STRING, allowNull: false },
  details: { type: DataTypes.TEXT },
  userName: { type: DataTypes.STRING },
  userEmail: { type: DataTypes.STRING },
  occurredAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Activity.belongsTo(Item, { foreignKey: 'itemId' });
Item.hasMany(Activity, { foreignKey: 'itemId' });

module.exports = Activity;
