const UserService = require("../services/userServices");
const userServices = new UserService();

class UserController {
  ///controlador para obtener los usuarios
  async getUsers(req, res, next) {
    try {
      const respuesta = await userServices.getUsers();
      res.status(200).json(respuesta);
    } catch (error) {
      next(error);
    }
  }

  ///controlador para registrar/crear un usuario
  ///recibe un objeto con los datos del usuario
  async createUser(req, res, next) {
    try {
      const response = await userServices.createUser(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  ///controlador para obtener un usuario por su id
  ///recibe el id por params

  async getUserById(req, res, next) {
    try {
      const response = await userServices.getUserById(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  ///controlador para actualizar la direccion del usuario

  async createOrUpdateAddress(req, res, next) {
    try {
      const response = await userServices.createOrUpdateAddress(
        req.params.id,
        req.body
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  ///controlador para loggear un usuario
  async singInUser(req, res, next) {
    try {
      const response = await userServices.singInUser(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const response = await userServices.deleteUser(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /// esta funcion recibe un id por parametro y lo envia al servicio
  /// recibe la address por body
  async createAddress(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      const response = await userServices.createAddress(id, payload);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    try {
      const response = await userServices.updateProfile(id, payload);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
