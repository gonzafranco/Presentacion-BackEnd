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
const rolController = require('../controller/rolcontroller')

//ruta administracion de usuarios
router.get("/usuarios", [verifyToken, esAdmin], getUsuarios);
router.get("/usuario/:usuario_id", [verifyToken, esAdmin], getUsuarioRuta);
router.put("/usuario/actualizar/:usuario_id",[verifyToken, esAdmin],updateUsuario);
router.delete("/usuario/borrar/:usuario_id",[verifyToken, esAdmin],deleteUsuario);

//roles actualiza y elimina roles del usuario

router.get("/usuario/rol/actualizar/:usuario_id",[verifyToken, esAdmin],rolController.getRolesRutas)
router.put("/usuario/rol/actualizar/:usuario_id",[verifyToken, esAdmin],rolController.updateRol)


//tarea crea, borra, ver, actualiza, elimina lo mismo que jefe.

router.get("/tareas",[verifyToken, esAdmin],tareacontroller.getTareas);
router.get("/tarea/:id",[verifyToken, esAdmin], tareacontroller.getTarea);
router.post("/crear-tarea",[verifyToken, esAdmin], tareacontroller.createTarea);
router.put("/tarea/actualizar/:id",[verifyToken, esAdmin], tareacontroller.updateTarea);
router.delete("/tarea/borar/:id",[verifyToken, esAdmin], tareacontroller.deleteTarea);

router.get('/tarea/asignar-tarea',[verifyToken, esAdmin]) //falta implemntar


module.exports = router;
