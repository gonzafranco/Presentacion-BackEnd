var express = require('express');
var router = express.Router();

const { createUsuario, getUsuarios, updateUsuario, deleteUsuario, getUsuario } = require('../controller/usuariocontroller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
