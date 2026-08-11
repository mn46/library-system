const bcrypt = require("bcrypt");
const db = require("../models/index");

const User = db.User;

exports.postCreateUser = async (req, res) => {
  try {
    const email = req.validated.email;

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({ message: "This user already exists." });
    }

    const hashedPassword = await bcrypt.hash(req.validated.password, 10);

    const user = await User.create({
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created." });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occured when creating a user.",
    });
  }
};
