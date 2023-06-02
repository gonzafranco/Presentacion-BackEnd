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

//rutas administracion de roles
const {getRoles,getRol,createRol,updateRol,deleteRol,} = require("../controller/rolcontroller");

router.get("/roles", [verifyToken, esAdmin],  getRoles);
router.get("/rol/:id", [verifyToken, esAdmin],  getRol);
//router.post("/", createRol);
router.put("/roles/actualizar/:id", [verifyToken, esAdmin],  updateRol);
router.delete("/rol/borrar/:id", [verifyToken, esAdmin],  deleteRol);



module.exports = router;
