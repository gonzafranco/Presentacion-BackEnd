const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const { DataTypes } = require("sequelize");

const Usuario = sequelize.define(
  "usuario",
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Usuario;
