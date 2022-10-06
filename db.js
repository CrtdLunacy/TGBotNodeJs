const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'telega_base',
    'root',
    'root', {
        host: '94.154.131.92',
        port: '6432',
        dialect: 'postgres'
    }
)