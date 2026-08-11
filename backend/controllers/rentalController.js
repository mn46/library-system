const { rentalCollection } = require("../resources/rentalResource");
const db = require("../models/index");
const sequelize = db.sequelize;
const Rental = db.Rental;
const Book = db.Book;
const Author = db.Author;

exports.createRental = async (req, res) => {
  const userId = req.validated.userId;
  const booksIds = req.validated.books;

  const loggedInUserId = req.session.userId;

  if (!loggedInUserId) {
    return res
      .status(401)
      .json({ message: "You have to log in to create a rental." });
  }

  if (Number(loggedInUserId) !== Number(userId)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
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
  const reqUserId = req.params.userId;
  const loggedInUserId = req.session.userId;

  if (!loggedInUserId) {
    return res
      .status(401)
      .json({ message: "You have to log in to view your rentals." });
  }

  if (Number(loggedInUserId) !== Number(reqUserId)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const rentals = await Rental.findAll({
      where: { userId: reqUserId },
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
