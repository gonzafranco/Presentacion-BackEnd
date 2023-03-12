import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    'presentacionDB', 
    'root', 
    'root', {
    host: 'postgres',
    dialect: 'postgres'
  });