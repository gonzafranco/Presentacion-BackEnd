const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('presentacionDB', 'root', 'root', {
  host: 'localhost',
  // host: 'postgres', //utilizar cuando se compila el codigo nodejs como container y se utiliza de manera colectiva en docker-compose
  dialect: 'postgres',
  port: 5433,
  define: {
    // timestamps: true,
    // freezeTableName: true,
    paranoid: true
  }
});

module.exports = sequelize