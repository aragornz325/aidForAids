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
    return await prisma.User.findMany();
  }

  /// metodo para obtener un usuario por id
  /// recibe un id
  async getUserById(id) {
    return await prisma.User.findUnique({
      where: {
        id: id,
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

  async updateUserAddress(id, address) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { address: { update: address } },
    });
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
}

module.exports = UserRepository;
