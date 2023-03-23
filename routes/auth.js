var express = require("express");
var router = express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const users = require("../models/usuario");

router.post("/register", async (req, res) => {
  const { usuario, email, clave } = req.body;

  if (usuario === "" || email === "") {
    return res.status(404).json({ message: "porfavor rellenar campos" });
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
    const isEmailExist = await users.findOne({ where:{email} });
    if (isEmailExist) {
      return res.status(400).json({ error: "Email ya registrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  try {

    const newUsuario = await users.create({
        usuario,
        email,
        clave
    });
    return res.status(200).json({ menssage: "usuario registrado" });
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
     
      if (!usuarioExiste) {
        return res.status(404).json({ message: "Usuario no existe" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    //quitar cuando se encrypte contraceña
    if(req.body.clave != usuarioExiste.clave)
    {
        return res.status(400).json({ error: 'contraseña no válida' });
    }


    //cuando se guarde la constraseña encryptada se habilita
    // const validPassword = await bcrypt.compare(req.body.clave, usuarioExiste.clave);
    // if (!validPassword){
    //     return res.status(400).json({ error: 'contraseña no válida' });
    // } 
    
    const token = jwt.sign({
        name: users.name,
        id: users.usuario_id
    }, process.env.TOKEN_SECRET)
    
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
  
});


module.exports = router;
