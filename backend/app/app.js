const express = require("express");
const sequelize = require("../util/database");

const app = express();

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Unable to connect:", err));

app.listen(3000);
