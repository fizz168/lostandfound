const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Role = require('./Role');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING },
  roleId: { type: DataTypes.TINYINT.UNSIGNED, allowNull: false, defaultValue: 1 },
});

User.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = User;
