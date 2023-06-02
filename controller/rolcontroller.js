const Usuario = require("../models/usuario");
const Rol = require("../models/rol");


exports.getRolesRutas = async (req,res) => {
    try {
        const usuario = await Usuario.findByPk(userId);
        const roles = await usuario.getRols({ raw: true }); 
          

        //hacer bien el res
     //res json.(roles.map((rol) => rol.nombre));
       

} catch (error) {
    console.log(error);
}
};



//retorna los roles de un usuario no se usa en rutas
exports.getRoles = async (userId) => {
    try {
        const usuario = await Usuario.findByPk(userId);
        const roles = await usuario.getRols({ raw: true }); 
          
     return roles.map((rol) => rol.nombre);
       

} catch (error) {
    console.log(error);
}
};



//le paso un usuario y le cambio los roles
exports.updateRol = async (req, res) => {
    try {
  const admin = req.body.admin === 'on'; // Verificar si la opción 2 fue seleccionada
  const jefe = req.body.jefe === 'on';
   //recibir el id a actualizar.     
        if(admin)
        {

        } 
        if(!admin)
        {

        }

        if(jefe)
        {

        }
        if(!jefe)
        {

        }


        const { id } = req.params;

        const { nombre } = req.body;

        const nombre_s = await Rol.findByPk(id);
        nombre_s.nombre = nombre;

        await nombre_s.save();

        res.status(200).json(nombre_s);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};





