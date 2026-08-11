const db = require("../models/index");
const Rental = db.Rental;

exports.createRental = async (req, res) => {
  try {
    const userId = req.validated.userId;
    const booksIds = req.validated.books;

    const TODAY = new Date();
    const DATE_TO = new Date(TODAY);
    DATE_TO.setDate(TODAY.getDate() + 30);

    const newRental = await Rental.create({
      userId: userId,
      dateFrom: TODAY,
      dateTo: DATE_TO,
    });

    await newRental.addBooks(booksIds);

    return res.status(201).json({ message: "Rental was created." });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "There was an issue loading books and authors.",
    });
  }
};
