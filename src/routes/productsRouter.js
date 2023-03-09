const { Router } = require("express");
const router = Router();

const ProductsController = require("../controller/productsController");
const productsController = new ProductsController();
const validatorHandler = require("../milddlewares/validator.handler");

const {
  createProductSchema,
  updateProductSchema,
} = require("../schemas/productsSchema");

const {
  createAddressSchema,
  updateAddressSchema,
} = require("../schemas/addressSchema");

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  productsController.createProduct
);

router.get("/", productsController.getProducts);

router.post("/carts/:id", productsController.createCartByUserId);
router.get("/:id", productsController.getProductById);
router.patch(
  "/:id",
  validatorHandler(updateProductSchema, "body"),
  productsController.updateProductById
);
router.delete("/:id", productsController.deleteProductById);

module.exports = router;
