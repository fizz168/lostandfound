const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Item = require('./Item');

const Claim = sequelize.define('Claim', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  claimantName: { type: DataTypes.STRING, allowNull: false },
  claimantEmail: { type: DataTypes.STRING, allowNull: false },
  reason: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

Claim.belongsTo(Item, { foreignKey: 'itemId' });
Item.hasMany(Claim, { foreignKey: 'itemId' });

module.exports = Claim;
