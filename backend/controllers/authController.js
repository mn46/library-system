const db = require("../models/index");
const bcrypt = require("bcrypt");

const User = db.User;

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ where: { email: email } });

    if (!existingUser) {
      return res.status(401).json({ message: "Incorrect login credentials." });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect login credentials." });
    }

    req.session.userId = existingUser.id;
    req.session.save((error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Could not log in, please try again." });
      }
      res.status(200).json({ message: "User was logged in." });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occured when logging in.",
    });
  }
};

exports.postLogout = (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Could not log out, please try again." });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "User was logged out." });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred when logging out.",
    });
  }
};
