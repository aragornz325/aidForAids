const { Router } = require("express");
const router = Router();

const ProductsController = require("../controller/productsController");
const productsController = new ProductsController();

router.post("/", productsController.createProduct);

module.exports = router;
