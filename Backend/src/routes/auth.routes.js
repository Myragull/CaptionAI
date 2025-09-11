const express = require("express");
const authController = require("../controllers/fixed-auth.controller");
const authValidationSchemas = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  validate(authValidationSchemas.registerSchema),
  authController.registerController
);
router.post(
  "/login",
  validate(authValidationSchemas.loginSchema),
  authController.loginController
);

router.post("/logout", authController.logoutController);

// backend/routes/auth.routes.js
router.get("/session", authMiddleware, authController.sessionController);
router.get("/me", authMiddleware, authController.meController);

module.exports = router;
