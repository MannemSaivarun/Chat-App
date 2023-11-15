const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Message = sequelize.define('messages',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  message: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  }
  
});


module.exports = Message;
