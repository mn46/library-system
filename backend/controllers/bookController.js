const { bookCollection } = require("../resources/bookResource");
const db = require("../models/index");
const Book = db.Book;
const Author = db.Author;

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Author,
          attributes: ["id", "name"],
          through: { attributes: [] }, // will omit the data from the joinig table
        },
      ],
    });

    return res.status(200).json({
      data: bookCollection(books),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "There was an issue loading books and authors.",
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Author,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json({
      data: bookCollection(book),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "There was an issue loading books and authors.",
    });
  }
};
