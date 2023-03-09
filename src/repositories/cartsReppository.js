const prisma = require("../../db");

const { Carts } = require("../../db");

class CartsRepository {
  async createCartsByUserId(userId, products) {
    /// crear un array con los id de los productos

    const conectP = [];
    const id = userId;
    products.forEach((product) => {
      conectP.push({ id: product });
    });

    const cart = await prisma.Cart.create({
      data: {
        userId: userId,
        users: {
          connect: { id: userId },
        },
        products: {
          connect: conectP,
        },
      },
      include: { products: true },
    });
    return cart;
  }
}

module.exports = CartsRepository;
