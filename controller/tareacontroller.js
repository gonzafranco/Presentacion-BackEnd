const Tarea = require("../models/tarea");
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const usuarioController = require("../controller/usuariocontroller");

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
      return res.status(404).json({ message: "Tarea no existe" });
    }
    res.json(tarea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createTarea = async (req, res) => {
  try {
    const { cuerpo, usuarioId } = req.body;
    const busqueda = Usuario.findOne({ where: { usuarioId } });

    if (busqueda) {
      const newTarea = await Tarea.create({
        cuerpo,
        usuarioId,
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
    res.json({ message: `Tarea con id ${id} eliminado` });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.asignaTarea = async (req, res) => {
  try {
    const usuarioId = req.params.usuario_id;
    const tareaId = req.params.tarea_id;

    const usuarioAsignaTarea = await usuarioController.getUsuario(usuarioId);

    if (!usuarioAsignaTarea) {
      return res.status(500).json({ message: "No se encontró el usuario" });
    }

    await usuarioAsignaTarea.addTarea(tareaId);

    res
      .status(200)
      .json({ message: "ID de tarea asignado al usuario con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.misTareas = async (req, res) => {
  const token = req.header("auth-token");
  let tokenDecode = jwt_decode(token);

  try {
    const tareas = await Tarea.findAll({
      where: { usuarioId: tokenDecode.id },
    });

    if (!tareas) {
      return res.status(404).json({ message: "no hay tarea/s" });
    }
    res.json(tareas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
