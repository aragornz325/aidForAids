const boom = require("@hapi/boom");

const ProductsRepository = require("../repositories/productsRepository");
const productsRepository = new ProductsRepository();
const CartsRepository = require("../repositories/cartsReppository");
const cartsRepository = new CartsRepository();
const UserService = require("../services/userServices");
const userService = new UserService();

class ProductService {
  async createProduct(product) {
    const response = await productsRepository.createProduct(product);
    return response;
  }

  async getProducts() {
    const response = await productsRepository.getProducts();
    return response;
  }

  async getProductById(id) {
    const response = await productsRepository.getProductById(id);

    return response;
  }

  async updateProductById(id, data) {
    const response = await productsRepository.updateProductById(id, data);
    return response;
  }

  async deleteProductById(id) {
    const response = await productsRepository.deleteProductById(id);
    return response;
  }

  async checkexistenceByProductId(id) {
    const response = await productsRepository.checkexistenceByProductId(id);
    if (!response.stock || response.stock === 0) {
      return false;
    }
  }

  async createCartByUserId(id, productsIds) {
    const user = await userService.getUserById(id);
    for (let i = 0; i < productsIds.length; i++) {
      const product = await this.getProductById(productsIds[i]);
      if (!product) {
        throw boom.notFound(`Product ${productsIds[i]} not found`);
      }
      if (product.stock < 0) {
        throw boom.badRequest("Not enough stock");
      }
    }
    const response = await cartsRepository.createCartsByUserId(id, productsIds);
    return response;
  }
}

module.exports = ProductService;
