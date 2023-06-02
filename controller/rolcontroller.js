const Usuario = require("../models/usuario");
const Rol = require("../models/rol");



//retorna los roles de un usuario
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





