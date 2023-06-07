const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const rolesController = require('../controller/rolcontroller')
const users = require("../models/usuario");
const Rol = require("../models/rol");


// middleware to validate token (rutas protegidas)
exports.verifyToken = async (req, res, next) => {
  let token = req.header("auth-token");
  token = req.header ("auth-token",actualizarRolesToken(token));
  try {
    const decodedToken = verifyToken(token);

    if (shouldRenewToken(decodedToken.exp)) {
      const renewedToken = renewToken(decodedToken);
      req.user = verifyToken(renewedToken);

      res.header('auth-token', renewedToken);
      
      console.log('Renewed Token:', renewedToken);
      const expirationDate = new Date(decodedToken.exp * 1000);
      const formattedExpiration = expirationDate.toLocaleString(); 
      console.log('Token expiration:', formattedExpiration);
      next()
    }
if(!shouldRenewToken(decodedToken.exp))
{
 
  token = this.actualizarRolesToken(token)
  console.log('el token todavia no expira');
  console.log('Renewed Token:', decodedToken);
  const expirationDate = new Date(decodedToken.exp * 1000);
  const formattedExpiration = expirationDate.toLocaleString(); 
  console.log('Token expiration:', formattedExpiration);
  next()
}
next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired.',
        data: null,
      });
    }

    console.error(error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: 'Failed to verify or renew token.',
        data: null,
      });
    }
  }
};

function shouldRenewToken(exp) {
  const currentTime = Math.floor(Date.now() / 1000);
  const remainingTime = exp - currentTime;

  return remainingTime <= 300;
}

function renewToken(decodedToken) {
  const renewedExp = Math.floor(decodedToken.exp + (5 * 60)); // Sumar 5 minutos
  return jwt.sign({ ...decodedToken, exp: renewedExp }, process.env.TOKEN_SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

exports.register = async (req, res) => {
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
    const newUsuario = await users.create({
        usuario,
        email,
        clave: claveHash
    });

    //rol 1 es usuario comun
    let rol = await Rol.findByPk(1);

    if (rol) {
      await newUsuario.addRol(rol);
    }
    


    return res.status(200).json({ message: "Usuario registrado" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  const { usuario, clave } = req.body;

  let usuarioExiste;
  if (usuario === "" || clave === "") {
    return res.status(404).json({ message: "Por favor rellenar campos" });
  }

  try {
    usuarioExiste = await users.findOne({ where: { usuario } });

    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario no existe" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const validPassword = await bcrypt.compare(clave, usuarioExiste.clave);
  if (!validPassword) {
    return res.status(400).json({ error: 'Contraseña no válida' });
  }

  
  console.log(usuarioExiste.id);
  
  const roles = await rolesController.getRoles(usuarioExiste.id);


  const token = jwt.sign(
    {
      usuario: usuarioExiste.usuario,
      id: usuarioExiste.id,
      rol: roles,
      exp: Math.floor(Date.now() / 1000) + (5 * 60)  // Expira en 5 minuto
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
};

actualizarRolesToken = async (token)=>{

  //const token = req.header("auth-token");
  const decodedToken = verifyToken(token);

  const roles = await rolesController.getRoles(decodedToken.id);
  const renewedToken= jwt.sign({ ...decodedToken, rol: roles }, process.env.TOKEN_SECRET);
  
  console.log('llega a actualizar los roles');

  return renewedToken;
  
}


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



exports.esAdmin = (req, res, next) => {
  const token = req.header("auth-token");
  let tokenDecode = jwt_decode(token);
  try {
    if (tokenDecode.rol.includes("admin")) {
      next();
    }
  } catch (error) {
    return res.status(400).json({ error: "acceso denegado" });
  }
};
