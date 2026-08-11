const express = require("express");
const createRentalSchema = require("../requests/createRentalRequest");
const rentalController = require("../controllers/rentalController");
const { validate } = require("../helpers/index");

const router = express.Router();

router.post(
  "/rental",
  validate(createRentalSchema),
  rentalController.createRental,
);

module.exports = router;
