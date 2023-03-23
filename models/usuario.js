const Sequelize = require('sequelize');
const sequelize= require('../database/database');

const tarea = require('./tarea')


const {DataTypes}=require('sequelize');
const Tarea = require('./tarea');


const Usuario= sequelize.define('usuario',{
  id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
     },
  usuario:{
      type:DataTypes.STRING
  },

  email:{
    type:DataTypes.STRING,
    allowNull:false
  },

  clave: {
    type:DataTypes.STRING,
    allowNull:false
    },
   fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now')
   }
   
   
},
{
  timestamps: false,
  })


Usuario.hasMany(tarea,{
    foreingKey: 'usuarioId',
    sourceKey: 'id'
})

tarea.belongsTo(Usuario,{
    foreignKey:'usuarioId',
    targetKey:'id'
})

module.exports = Usuario;
