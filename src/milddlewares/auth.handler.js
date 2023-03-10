const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

const { config } = require("../config/config");

async function isAuthenticated(req, res, next) {
  const authorization = req.headers.authorization ?? "sin token";

  if (authorization === "sin token") {
    next(boom.unauthorized("unauthorized / no tiene token"));
  }
  if (!authorization.startsWith("Bearer ")) {
    next(boom.unauthorized("unauthorized / no es un bearer"));
  }
  const split = authorization.split("Bearer ");
  if (split.length !== 2) {
    next(boom.unauthorized("unauthorized / no llego el token"));
  }
  const token = split[1];
  try {
    const decodedToken = jwt.decode(token);
    res.locals = {
      ...res.locals,
      uid: decodedToken.id,
      role: decodedToken.role,
    };

    return next();
  } catch (error) {
    next(boom.unauthorized("unauthorized / invalid token"));
  }
}

function isAuthorized({ hasRole, allowSameUser }) {
  return (req, res, next) => {
    const { role, uid } = res.locals;
    const id = req.headers["x-user-id"];

    if (allowSameUser && id && uid === id) {
      return next();
    }
    if (hasRole.includes(role)) {
      next();
    } else {
      next(boom.unauthorized("unauthorized / no role o allow same user"));
    }
  };
}

function checkApiKey(req, res, next) {
  if (!req.headers["x-api-key"]) {
    next(boom.unauthorized("unauthorized - need api key"));
  }
  const apiKey = req.headers["x-api-key"];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized("unauthorized / invalid api key"));
  }
}

module.exports = { checkApiKey, isAuthenticated, isAuthorized };
