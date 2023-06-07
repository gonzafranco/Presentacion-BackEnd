var express = require("express");
var router = express.Router();

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

router.get('/asignar-tarea',[verifyToken, esAdmin])







module.exports = router;
