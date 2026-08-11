const express = require("express");
const createRentalSchema = require("../requests/createRentalRequest");
const rentalController = require("../controllers/rentalController");
const { validate, validateUser } = require("../helpers/index");

const router = express.Router();

router.post(
  "/rental/:userId",
  validate(createRentalSchema),
  validateUser,
  rentalController.createRental,
);

router.get("/rental/:userId", validateUser, rentalController.getRentals);

module.exports = router;
