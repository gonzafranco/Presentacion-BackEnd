var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../models/usuario");
const rol = require("../models/rol");

router.post("/register", async (req, res) => {
  const { usuario, email, clave, roles } = req.body;

  if (usuario === "" || email === "") {
    return res.status(404).json({ message: "Por favor rellenar campos" });
  }

  try {
    const usuarioExiste = await users.findOne({ where: { usuario } });

    if (usuarioExiste) {
      return res.status(404).json({ message: "Usuario existe" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {
    const isEmailExist = await users.findOne({ where: { email } });
    if (isEmailExist) {
      return res.status(400).json({ error: "Email ya registrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  const claveHash = await encriptarContrasena(clave);

  console.log(claveHash);
  
  try {
    const hashedClave = await bcrypt.hash(clave, 10);
    const newUsuario = await users.create(
      {
        usuario,
        email,
        clave: claveHash
    });

    return res.status(200).json({ message: "Usuario registrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { usuario, clave } = req.body;

  let usuarioExiste;
  if (usuario === "" || clave === "") {
    return res.status(404).json({ message: "porfavor rellenar campos" });
  }

  try {
    usuarioExiste = await users.findOne({ where: { usuario } });
    userData = await users.findOne({ where: { usuario } });

    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario no existe" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  //cuando se guarde la constraseña encryptada se habilita
  const validPassword = await bcrypt.compare(clave, usuarioExiste.clave);
  if (!validPassword){
      return res.status(400).json({ error: 'contraseña no válida' });
  }
  console.log("Valor de TOKEN_SECRET:", process.env.TOKEN_SECRET);
  //traer el rol de la base de datos
  const token = jwt.sign(
    {
      name: usuarioExiste.usuario,
      id: usuarioExiste.usuario_id,
      rol: ["admin", "jefe"],
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });

  if (!validPassword) {
    return res.status(400).json({ error: "contraseña no válida" });
  }

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

async function encriptarContrasena(contrasena) {
  try {
    // Generar la sal
    const salt = await bcrypt.genSalt(10);

    // Generar el hash de la contraseña
    const hash = await bcrypt.hash(contrasena, salt);

    return hash;
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    throw error;
  }
}


module.exports = router;
