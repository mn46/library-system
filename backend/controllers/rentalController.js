const { rentalCollection } = require("../resources/rentalResource");
const db = require("../models/index");
const sequelize = db.sequelize;
const Rental = db.Rental;
const Book = db.Book;
const Author = db.Author;

exports.createRental = async (req, res) => {
  try {
    userId = req.params.userId;
    const booksIds = req.validated.books;

    const TODAY = new Date();
    const DATE_TO = new Date(TODAY);
    DATE_TO.setDate(TODAY.getDate() + 30);

    await sequelize.transaction(async (t) => {
      const newRental = await Rental.create(
        {
          userId: userId,
          dateFrom: TODAY,
          dateTo: DATE_TO,
        },
        { transaction: t },
      );

      await newRental.addBooks(booksIds, { transaction: t });
    });

    return res.status(201).json({ message: "Rental was created." });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "There was an issue loading books and authors.",
    });
  }
};

exports.getRentals = async (req, res) => {
  try {
    const userId = req.params.userId;

    const rentals = await Rental.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          attributes: ["id", "title"],
          through: { attributes: [] },
          include: [
            {
              model: Author,
              attributes: ["id", "name"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      data: rentalCollection(rentals),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "There was an issue loading books and authors.",
    });
  }
};
