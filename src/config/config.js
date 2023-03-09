require("dotenv").config();

const config = {
  apiKey: process.env.API_KEY,
  jwt: {
    secret: process.env.JWT_SECRETKEY,
    refrehSecret: process.env.REFRESH_TOKEN_SECRET,
  },
};

module.exports = { config };
