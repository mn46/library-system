const express = require("express");
const userController = require("../controllers/userController");
const { createUserSchema, validate } = require("../requests/createUserRequest");

const router = express.Router();

router.post(
  "/create-user",
  validate(createUserSchema),
  userController.postCreateUser,
);

module.exports = router;
