const router = require("express").Router();
const authController = require("../controllers/auth");
const validateRequest = require("../middlewares/validateRequest");
const { loginSchema } = require("../utils/validationSchema");

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.loginHandler
);

module.exports = router;
