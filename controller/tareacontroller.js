const Tarea = require("../models/tarea");
const Usuario = require("../models/usuario");



exports.getTareas = async (req, res) => {
    try {
        const Tareas = await Tarea.findAll();
        
         res.status(200).json(Tareas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getTarea = async (req, res) => {

    try {
        const { id } = req.params;
        const tarea = await Tarea.findOne({ where: { id } });

        if (!tarea) {
            return res.status(404).json({ message: "Tarea no existe" })
        }
        res.json(tarea);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.createTarea = async (req, res) => {
    try {
        const { cuerpo,usuarioId } = req.body;
        const busqueda = Usuario.findOne({ where: { usuarioId } })


        if(busqueda){
            const newTarea = await Tarea.create({
                cuerpo,
                usuarioId
            });
            res.json(newTarea);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateTarea = async (req, res) => {
    try {
        const { id } = req.params;

        const { cuerpo } = req.body;

        const cuerpo_s = await Tarea.findByPk(id);
        cuerpo_s.cuerpo = cuerpo;

        await cuerpo_s.save();

        res.status(200).json(cuerpo_s);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;

        await Tarea.destroy({
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