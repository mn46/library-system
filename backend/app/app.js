const express = require("express");
const cors = require("cors");
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

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

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
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  }),
);

// ROUTES
app.use(userRoutes);
app.use(authRoutes);
app.use(bookRoutes);
app.use("/user", rentalRoutes);

// INIT
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Unable to connect:", err));

db.sequelize.sync();
sequelizeStore.sync();

app.listen(4000);
