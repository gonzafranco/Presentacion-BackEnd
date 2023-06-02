var express = require("express");
var router = express.Router();

const {
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuario,
} = require("../controller/usuariocontroller");

const { verifyToken, esAdmin } = require("../controller/auth-controller");

//ruta administracion de usuarios
router.get("/usuarios", [verifyToken, esAdmin], getUsuarios);
router.get("/usuario/:usuario_id", [verifyToken, esAdmin], getUsuario);
router.put("/usuario/actualizar/:usuario_id",[verifyToken, esAdmin],updateUsuario);
router.delete("/usuario/borrar/:usuario_id",[verifyToken, esAdmin],deleteUsuario);

//roles actualiza y elimina roles del usuario





//tarea crea, borra, ver, actualiza, elimina lo mismo que jefe.









module.exports = router;
