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

exports.updateRental = async (req, res) => {
  try {
    const rentalId = req.params.rentalId;
    const books = req.validated.books;

    const rental = await Rental.findOne({
      where: { id: rentalId },
      include: [
        {
          model: Book,
          attributes: ["id"],
        },
      ],
    });

    if (!rental) {
      return res.status(404).json({ message: "Rental was not found." });
    }

    const rentedBooks = rental.Books;

    const booksToAdd = books.filter((book) => !rentedBooks.includes(book.id));
    const booksToRemove = rentedBooks.filter(
      (book) => !books.includes(book.id),
    );

    if (booksToAdd) {
      await rental.addBooks(booksToAdd, { through: "BookRental" });
    }

    if (booksToRemove) {
      await rental.removeBooks(booksToRemove, { through: "BookRental" });
    }

    return res.status(200).json({ message: "Your rental was updated." });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "There was an issue loading books and authors.",
    });
  }
};

exports.deleteRental = async (req, res) => {
  try {
    const rentalId = req.params.rentalId;
    await Rental.destroy({ where: { id: rentalId } });

    return res.status(200).json({ message: "Rental was deleted." });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "There was an issue loading books and authors.",
    });
  }
};
