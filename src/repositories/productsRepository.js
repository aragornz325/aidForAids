const prisma = require("../../db");

const { Product } = require("../../db");

class ProductsRepository {
  async createProduct(data) {
    const product = await prisma.Product.create({
      data,
    });
    return product;
  }

  async getProducts() {
    const products = await Product.findMany();
    return products;
  }

  async getProductById(id) {
    const product = await Product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }

  async updateProductById(id, data) {
    const product = await Product.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return product;
  }

  async deleteProductById(id) {
    const product = await Product.delete({
      where: {
        id,
      },
    });
    return product;
  }
}

module.exports = ProductsRepository;
