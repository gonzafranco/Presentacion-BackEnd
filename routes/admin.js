var express = require("express");
var router = express.Router();

const tareacontroller = require('../controller/tareacontroller');
const {
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarioRuta,
} = require("../controller/usuariocontroller");

const { verifyToken, esAdmin, actualizarRolesToken } = require("../controller/auth-controller");
const rolController = require('../controller/rolcontroller');

// Rutas de administración de usuarios
router.get("/usuarios", [verifyToken, esAdmin], getUsuarios);
router.get("/usuario/:usuario_id", [verifyToken, esAdmin], getUsuarioRuta);
router.put("/usuario/actualizar/:usuario_id", [verifyToken, esAdmin], updateUsuario);
router.delete("/usuario/borrar/:usuario_id", [verifyToken, esAdmin], deleteUsuario);

// Rutas de actualización y eliminación de roles del usuario
router.get("/usuario/rol/actualizar/:usuario_id", [verifyToken, esAdmin], rolController.getRolesRutas);
router.put("/usuario/rol/actualizar/:usuario_id", [verifyToken, esAdmin], rolController.updateRol);

// Rutas relacionadas con las tareas
router.get("/tareas", [verifyToken, esAdmin], tareacontroller.getTareas);
router.get("/tarea/:id", [verifyToken, esAdmin], tareacontroller.getTarea);
router.post("/tarea/crear", [verifyToken, esAdmin], tareacontroller.createTarea);
router.put("/tarea/actualizar/:id", [verifyToken, esAdmin], tareacontroller.updateTarea);
router.delete("/tarea/borrar/:id", [verifyToken, esAdmin], tareacontroller.deleteTarea);

//get usuarios y tareas sin asignar filtar si es jefe por los que tiene a cargo

// Ruta para asignar una tarea a un usuario
//debe ser post
router.get("/tarea/asignar/:usuario_id/:tarea_id", [verifyToken, esAdmin], tareacontroller.asignaTarea);

// Ruta para obtener las tareas de un usuario
router.get("/tarea/mias", [verifyToken, esAdmin], tareacontroller.misTareas);

module.exports = router;
