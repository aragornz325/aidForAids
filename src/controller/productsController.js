const ProductService = require("../services/productService");
const productsServices = new ProductService();

class ProductsController {
  async createProduct(req, res, next) {
    try {
      const response = await productsServices.createProduct(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const response = await productsServices.getProducts();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const response = await productsServices.getProductById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProductById(req, res, next) {
    try {
      const response = await productsServices.updateProductById(
        req.params.id,
        req.body
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const response = await productsServices.deleteProductById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductsController;
