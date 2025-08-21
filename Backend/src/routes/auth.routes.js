const express = require("express");
const authController = require("../controllers/auth.controller");
const authValidationSchemas = require("../validators/auth.validator")
const validate = require("../middlewares/validate.middleware")
const router = express.Router();

router.post("/register",validate(authValidationSchemas.registerSchema),authController.registerController);
router.post("/login",validate(authValidationSchemas.loginSchema),authController.loginController);

router.post("/logout",authController.logoutController);

module.exports = router;
