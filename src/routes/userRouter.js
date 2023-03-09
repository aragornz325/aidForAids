const { Router } = require("express");
const router = Router();

const UserController = require("../controller/userController");
const userController = new UserController();

const {
  isAuthenticated,
  isAuthorized,
} = require("../milddlewares/auth.handler");

const validatorHandler = require("../milddlewares/validator.handler");
const {
  createAddressSchema,
  updateAddressSchema,
} = require("../schemas/addressSchema");

router.post("/", userController.createUser);
router.get(
  "/",
  isAuthenticated,
  isAuthorized({
    hasRole: ["CUSTOMER"],
    allowSameUser: false,
  }),
  userController.getUsers
);
router.post("/login", userController.singInUser);

router.post(
  "/address/:id",
  validatorHandler(createAddressSchema, "body"),
  userController.createOrUpdateAddress
);

router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateProfile);

router.delete("/:id", userController.deleteUser);

module.exports = router;
