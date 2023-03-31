var express = require("express");
var router = express.Router();

const {
  createUsuario,
  getUsuarios,
  updateUsuario,
  deleteUsuario,
  getUsuario,
} = require("../controller/usuariocontroller");
const { verifyToken, esAdmin } = require("../controller/auth-controller");

/* GET users listing. */

router.get("/", [verifyToken, esAdmin], getUsuarios);

router.put("/:usuario_id", [verifyToken, esAdmin], updateUsuario);

router.delete("/:usuario_id", [verifyToken, esAdmin], deleteUsuario);



module.exports = router;
