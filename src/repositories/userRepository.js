const prisma = require("../../db");

const { User, Address } = require("../../db");

class UserRepository {
  ///metodo para registrar un usuario en la db
  async createUser(user) {
    await prisma.User.create({
      data: user,
    });

    return { msg: "ok" };
  }

  /// metodo para obtener todos los usuarios de la db
  async getUsers() {
    return await prisma.User.findMany({
      include: {
        address: true,
      },
    });
  }

  /// metodo para obtener un usuario por id
  /// recibe un id
  async getUserById(id) {
    return await prisma.User.findUnique({
      where: {
        id: id,
      },
      include: {
        address: true,
      },
    });
  }

  /// metodo para actualizar un usuario
  /// recibe un id y un objeto con los datos a actualizar
  async updateUser(id, user) {
    return await prisma.User.update({
      where: {
        id: id,
      },
      data: user,
    });
  }

  /// metodo para eliminar un usuario
  /// recibe un id
  async deleteUser(id) {
    return await prisma.User.delete({
      where: {
        id: id,
      },
    });
  }

  async createOrUpdateAddress(userId, addressData) {
    const user = await prisma.User.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const { street, number, city, postalCode, state, country } = addressData;

    const address = await prisma.Address.upsert({
      where: { id: user.address?.id || "" },
      update: {
        street,
        number,
        city,
        postalCode,
        state,
        country,
        updatedAt: new Date(),
      },
      create: {
        street,
        number,
        city,
        postalCode,
        state,
        country,
        createdAt: new Date(),
      },
    });

    const updatedUser = await prisma.User.update({
      where: { id: userId },
      data: {
        address: {
          connect: { id: address.id },
        },
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  }

  async getUserByEmail(email) {
    return await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
  }
  async updateTokens(id, refreshToken, accessToken) {
    return await prisma.User.update({
      where: { id },
      data: { refreshToken, accessToken },
    });
  }

  async updateProfile(id, profile) {
    return await prisma.User.update({
      where: { id },
      data: { profile },
    });
  }
}

module.exports = UserRepository;
