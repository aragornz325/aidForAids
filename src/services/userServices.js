const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();
const bcrypt = require("bcrypt");
const { config } = require("../config/config");
const jwt = require("jsonwebtoken");

class UserService {
  /// crea un usuario, hashea la contraseña y la guarda en la base de datos
  async createUser(user) {
    const hashedPassword = await bcrypt.hashSync(user.password, 10);
    const payload = {
      ...user,
      password: hashedPassword,
    };

    return await userRepository.createUser(payload);
  }

  /// obtiene todos los usuarios de la base de datos y elimina la contraseña de cada uno
  async getUsers() {
    const response = await userRepository.getUsers();

    response.forEach((user) => {
      delete user.password;
      delete user.refreshToken;
      delete user.accessToken;
    });

    return response;
  }

  /// obtiene un usuario por id y elimina la contraseña
  async getUserById(id) {
    const response = await userRepository.getUserById(id);
    delete response.id;
    return response;
  }

  async updateUser(id, user) {
    return await userRepository.updateUser(id, user);
  }

  async deleteUser(id) {
    const checkUser = await userRepository.getUserById(id);
    if (!checkUser) {
      return { error: "Usuario no encontrado" };
    }
    await userRepository.deleteUser(id);
    return { msg: "ok" };
  }

  async updateUserAddress(id, adress) {
    return await userRepository.updateUserAddress(id, Address);
  }

  async singInUser(user) {
    const response = await userRepository.getUserByEmail(user.email);
    if (response) {
      const passwordMatch = await bcrypt.compareSync(
        user.password,
        response.password
      );
      if (passwordMatch) {
        delete response.password;
        const { id, role } = response;
        const accessToken = jwt.sign({ id, role }, config.jwt.secret, {
          expiresIn: "6d",
        });
        const refreshToken = jwt.sign({ id, role }, config.jwt.refrehSecret);
        await userRepository.updateTokens(id, refreshToken, accessToken); // Guardar los tokens en la base de datos

        return { user: response, accessToken, refreshToken };
      } else {
        return { error: "Contraseña incorrecta" };
      }
    } else {
      return { error: "Usuario no encontrado" };
    }
  }
}

module.exports = UserService;
