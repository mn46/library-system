const express = require("express");
const db = require("../models/index");
const userRoutes = require("../routes/user");

const app = express();

app.use(express.json());

// routes
app.use(userRoutes);

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Unable to connect:", err));

db.sequelize.sync();

app.listen(4000);
