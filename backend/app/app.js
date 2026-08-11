const express = require("express");
const db = require("../models/index");
require("dotenv").config();
const userRoutes = require("../routes/user");
const authRoutes = require("../routes/auth");
const bookRoutes = require("../routes/book");
const rentalRoutes = require("../routes/rental");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

app.use(express.json());

// SESSION

const sequelizeStore = new SequelizeStore({
  db: db.sequelize,
});

// resave false will make sure the session is saved only when sth changes in the session (better performance)
// saveUninitialized false ensures no session is saved for a request where it does not need to be saved
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sequelizeStore,
    resave: false,
    saveUninitialized: false,
  }),
);

// ROUTES
app.use(userRoutes);
app.use(authRoutes);
app.use(bookRoutes);
app.use(rentalRoutes);

// INIT
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Unable to connect:", err));

db.sequelize.sync();
sequelizeStore.sync();

app.listen(4000);
