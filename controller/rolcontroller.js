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



//ver
exports.getRoles2 = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        const nombres = roles.map(({ nombre }) => nombre); // Obtener solo los nombres de los roles
        res.status(200).json(nombres);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

exports.getRol = async (id) => {
    try {
        const rol = await Rol.findByPk(id);

        if (!rol) {
            throw new Error("Rol no existe");
        }
        
        return rol;
    } catch (error) {
        throw error;
    }
};


exports.createRol = async (req, res) => {
    try {
        const { nombre } = req.body;


        try {
            const rolExiste = await Rol.findOne({ where: { nombre } });
        
            if (rolExiste) {
              return res.status(404).json({ message: "rol existe" });
            }
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }

        const newRol = await Rol.create({
            nombre
        });
        res.status(200).json(newRol);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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


exports.deleteRol = async (req, res) => {
    try {
        const { id } = req.params;

        await Rol.destroy({
            where: {
                id,
            },
        });

        res.sendStatus(204); // Enviar solo el código de estado 204 sin contenido
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



exports.setUsuarioRol= async (req,res)=>
{

    

}