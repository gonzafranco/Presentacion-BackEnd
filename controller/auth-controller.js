const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

// middleware to validate token (rutas protegidas)
exports.verifyToken = (req, res, next) => {
  console.log("--------------");
  console.log("entra veryfy");
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: "token no es válido" });
  }
};

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
