const Rol = require("../models/rol");

exports.cargarRoles = async  ()=> {
    try {
      // Cargar cuatro roles con el ID específico para el rol "Usuario"
      const roles = [
        { id: 2, nombre: 'Administrador' },
        { id: 1, nombre: 'Usuario' },
        // { id: 2, nombre: 'Editor' },
        // { id: 3, nombre: 'Invitado' }
      ];
  
      // Utilizar el método 'bulkCreate' de Sequelize para insertar múltiples registros de una vez
      await Rol.bulkCreate(roles, { validate: true, ignoreDuplicates: true });
  
      console.log('Roles cargados exitosamente.');
    } catch (error) {
      console.error('Error al cargar los roles:', error);
    }
  }
  
