const Usuario = require("../models/usuario");



exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        
         res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getUsuario = async (req, res) => {

    try {
        const { id } = req.params;
        const usuario = await Usuario.findOne({ where: { id } });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no existe" })
        }
        res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.createUsuario = async (req, res) => {
    try {
        const { usuario, clave } = req.body;

        const newUsuario = await Usuario.create({
            usuario,
            clave
        });

        res.status(200).send(newUsuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const { usuario, clave } = req.body;

        const usuario_s = await Usuario.findByPk(id);
        usuario_s.usuario = usuario;
        usuario_s.clave = clave;
        await usuario_s.save();

        res.status(200).json(usuario_s);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario_eliminado = await Usuario.destroy({
            where: {
                id,
            },
        });
        res.json({message:`usuario con id ${id} eliminado`});
        res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

