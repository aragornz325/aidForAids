const ProductsRepository = require("../repositories/productsRepository");
const productsRepository = new ProductsRepository();

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
}

module.exports = ProductService;
