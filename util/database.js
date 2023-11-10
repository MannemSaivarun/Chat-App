const Sequelize = require('sequelize');

const sequelize = new Sequelize('chatapp', 'root', 'Msv@1234', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;