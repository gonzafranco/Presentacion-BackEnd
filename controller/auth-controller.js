const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
exports.verifyToken = (req, res, next) => {
    console.log('--------------');
    console.log('entra veryfy');
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

exports.esAdmin=(req,res,next)=>{

    const token =req.header('auth-token');
    let tokenDecode=parseJwt(token);
    console.log('-*-----------------');
    console.log(tokenDecode);    
    

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}