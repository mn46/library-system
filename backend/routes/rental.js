const express = require("express");
const createRentalSchema = require("../requests/createRentalRequest");
const updateRentalSchema = require("../requests/updateRentalRequest");
const rentalController = require("../controllers/rentalController");
const { validate, validateUser } = require("../helpers/index");

const router = express.Router();

router.post(
  "/:userId/rentals",
  validate(createRentalSchema),
  validateUser,
  rentalController.createRental,
);

router.get("/:userId/rentals", validateUser, rentalController.getRentals);

router.post(
  "/:userId/rentals/:rentalId",
  validate(updateRentalSchema),
  validateUser,
  rentalController.updateRental,
);

router.delete(
  "/:userId/rentals/:rentalId",
  validateUser,
  rentalController.deleteRental,
);

module.exports = router;
