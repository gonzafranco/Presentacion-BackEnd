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

const { verifyToken, esAdmin, actualizarRolesToken, esAdminRuta } = require("../controller/auth-controller");
const rolController = require('../controller/rolcontroller');

// Rutas de administración de usuarios
router.get("/usuarios", [verifyToken, esAdminRuta], getUsuarios);
router.get("/usuario/:usuario_id", [verifyToken, esAdminRuta], getUsuarioRuta);
router.put("/usuario/actualizar/:usuario_id", [verifyToken, esAdminRuta], updateUsuario);
router.delete("/usuario/borrar/:usuario_id", [verifyToken, esAdminRuta], deleteUsuario);

// Rutas de actualización y eliminación de roles del usuario
router.get("/usuario/rol/actualizar/:usuario_id", [verifyToken, esAdminRuta], rolController.getRolesRutas);
router.put("/usuario/rol/actualizar/:usuario_id", [verifyToken, esAdminRuta], rolController.updateRol);

// Rutas relacionadas con las tareas
router.get("/tareas", [verifyToken, esAdminRuta], tareacontroller.getTareas);
router.get("/tarea/:id", [verifyToken, esAdminRuta], tareacontroller.getTarea);
router.post("/tarea/crear", [verifyToken, esAdminRuta], tareacontroller.createTarea);
router.put("/tarea/actualizar/:id", [verifyToken, esAdminRuta], tareacontroller.updateTarea);
router.delete("/tarea/borrar/:id", [verifyToken, esAdminRuta], tareacontroller.deleteTarea);

//get usuarios y tareas sin asignar filtar si es jefe por los que tiene a cargo
router.get("/tarea/obtener-a-cargo",[verifyToken, esAdminRuta], tareacontroller.otenerTareasAcargo)

// Ruta para asignar una tarea a un usuario
//debe ser post
router.get("/tarea/asignar/:usuario_id/:tarea_id", [verifyToken, esAdminRuta], tareacontroller.asignaTarea);

// Ruta para obtener las tareas de un usuario
router.get("/tarea/mias", [verifyToken, esAdminRuta], tareacontroller.misTareas);

module.exports = router;
