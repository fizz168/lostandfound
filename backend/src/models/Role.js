const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Role = sequelize.define('Role', {
  id: { type: DataTypes.TINYINT.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
}, {
  timestamps: false,
})

module.exports = Role
