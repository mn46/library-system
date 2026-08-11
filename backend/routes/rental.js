const express = require("express");
const {
  createRentalSchema,
  validate,
} = require("../requests/createRentalRequest");
const rentalController = require("../controllers/rentalController");

const router = express.Router();

router.post(
  "/rental",
  validate(createRentalSchema),
  rentalController.createRental,
);

module.exports = router;
