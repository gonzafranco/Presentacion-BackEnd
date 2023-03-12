import { DataTypes } from "sequelize";
import { sequelize } from "../database/db";

export const Usuario = sequelize.define('usuario', 
{
  usaurio_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Usuario;
