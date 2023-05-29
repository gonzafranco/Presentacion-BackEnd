const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

// middleware to validate token (rutas protegidas)
exports.verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");

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
    }
if(!shouldRenewToken(decodedToken.exp))
{
 
  console.log('el token todavia no expira');
  console.log('Renewed Token:', decodedToken);
  const expirationDate = new Date(decodedToken.exp * 1000);
  const formattedExpiration = expirationDate.toLocaleString(); 
  console.log('Token expiration:', formattedExpiration);
 
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
