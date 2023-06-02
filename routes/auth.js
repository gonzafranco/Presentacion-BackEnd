var express = require("express");
var router = express.Router();






const authController = require('../controller/auth-controller')


router.post("/register",authController.register)

router.post("/login",authController.login )


module.exports = router;
