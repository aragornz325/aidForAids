const userRouter = require("./userRouter");
const productRouter = require("./productsRouter");

function routerApi(app) {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
}

module.exports = routerApi;
