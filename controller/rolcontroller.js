const Usuario = require("../models/usuario");
const Rol = require("../models/rol");




exports.getRoles = async (req, res) => {
    try {
        const Roles = await Rol.findAll();
        
         res.status(200).json(Roles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getRol = async (req, res) => {

    try {
        const { id } = req.params;
        const rol = await Rol.findOne({ where: { id } });

        if (!rol) {
            return res.status(404).json({ message: "Rol no existe" })
        }
        res.status(200).json(rol);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
        res.json({message:`Tarea con id ${id} eliminado`});
        res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};