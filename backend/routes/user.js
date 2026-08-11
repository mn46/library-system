const express = require("express");
const userController = require("../controllers/userController");
const createUserSchema = require("../requests/createUserRequest");
const { validate } = require("../helpers/index");

const router = express.Router();

router.post(
  "/create-user",
  validate(createUserSchema),
  userController.postCreateUser,
);

module.exports = router;
