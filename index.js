const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { checkApiKey } = require("./src/milddlewares/auth.handler");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  error404Handler,
} = require("./src/milddlewares/error.handler");

const port = 3000;

const routerApi = require("./src/routes/index");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("welcome");
});
app.get("/status", (req, res) => res.status(200).send("server ok"));
app.use(checkApiKey);

routerApi(app);

app.use(error404Handler);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
