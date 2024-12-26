const router = require("express").Router();
const authRouter = require("./auth");
const validateAccess = require("../middlewares/validateAccess");
const validateRequest = require("../middlewares/validateRequest");
const userController = require("../controllers/user");

router.use("/auth", authRouter);

router.use(validateAccess);

router.post("/user", userController.createUserHandler);
router.get("/user", userController.getAllUserHandler);
router.get("/user/:id", userController.getOneUserHandler);
router.put("/user/:id", userController.updateUserHandler);
router.delete("/user/:id", userController.deleteUserHandler);

module.exports = router;
