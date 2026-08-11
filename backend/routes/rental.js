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

router.get("/rental/:userId", rentalController.getRentals);

module.exports = router;
