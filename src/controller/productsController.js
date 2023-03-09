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

  /// este controlador recibe un id por parametro
  /// y lo envia al servicio para que lo busque en la db
  /// al llegar como string lo convierte a numero
  async getProductById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const response = await productsServices.getProductById(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /// este controlador recibe un id por parametro y actualiza el producto
  /// la informacion que se envia en el body
  /// y lo envia al servicio para que lo busque en la db
  /// al llegar como string lo convierte a numero
  async updateProductById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const response = await productsServices.updateProductById(id, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /// este controlador recibe un id por parametro y lo envia al servicio
  /// para que lo busque en la db y lo elimine
  /// al llegar como string lo convierte a numero

  async deleteProductById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const response = await productsServices.deleteProductById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductsController;
