const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const routes = require("./routes/routes.js");
dotenv.config();
const sequelize = require("./config/database");

const app = express();
app.use(bodyParser.json());
app.use("/", routes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
