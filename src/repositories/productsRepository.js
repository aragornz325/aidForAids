const prisma = require("../../db");

const { Products } = require("../../db");

class ProductsRepository {
  async createProduct(data) {
    const price = parseFloat(data.price);
    const stock = parseInt(data.stock);

    const product = await prisma.Product.create({
      data: { ...data, price, stock },
    });
    return product;
  }

  async getProducts() {
    const products = await prisma.Product.findMany();
    return products;
  }

  async getProductById(id) {
    const product = await prisma.Product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }

  async updateProductById(id, data) {
    const product = await prisma.Product.update({
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
    const product = await prisma.Product.delete({
      where: {
        id,
      },
    });
    return product;
  }

  async checkexistenceByProductId(id) {
    const product = await prisma.Product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }
}

module.exports = ProductsRepository;
