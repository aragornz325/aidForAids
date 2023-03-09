const { Router } = require("express");
const router = Router();

const UserController = require("../controller/userController");
const userController = new UserController();

const { checkApiKey } = require("../milddlewares/auth.handler");

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.post("/login", userController.singInUser);

router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUserAddress);

router.delete("/:id", userController.deleteUser);

module.exports = router;
