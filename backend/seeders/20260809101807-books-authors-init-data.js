"use strict";
const db = require("../models/index");
const Book = db.Book;
const Author = db.Author;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const books = [
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        publishingDate: "1813-01-28",
        description:
          "A witty tale of manners, marriage, and misjudged first impressions among the English gentry.",
      },
      {
        title: "Moby-Dick",
        author: "Herman Melville",
        publishingDate: "1851-10-18",
        description:
          "A whaling ship captain's obsessive hunt for a giant white whale, and the philosophical journey that follows.",
      },
      {
        title: "Frankenstein",
        author: "Mary Shelley",
        publishingDate: "1818-01-01",
        description:
          "A scientist creates life from dead matter, only to be haunted by the consequences of his own ambition.",
      },
      {
        title: "Dracula",
        author: "Bram Stoker",
        publishingDate: "1897-05-26",
        description:
          "A Transylvanian count's move to England unleashes a gothic battle between the living and the undead.",
      },
      {
        title: "The Adventures of Sherlock Holmes",
        author: "Arthur Conan Doyle",
        publishingDate: "1892-10-14",
        description:
          "A collection of mysteries solved by the brilliant and eccentric detective of 221B Baker Street.",
      },
      {
        title: "Great Expectations",
        author: "Charles Dickens",
        publishingDate: "1861-08-01",
        description:
          "An orphan boy's rise through unexpected wealth, and the hard lessons he learns about class and character.",
      },
      {
        title: "A Tale of Two Cities",
        author: "Charles Dickens",
        publishingDate: "1859-04-30",
        description:
          "A story of sacrifice and revolution set against the backdrop of London and Paris before the French Revolution.",
      },
      {
        title: "War and Peace",
        author: "Leo Tolstoy",
        publishingDate: "1869-01-01",
        description:
          "An epic following several noble Russian families through the Napoleonic Wars and their aftermath.",
      },
      {
        title: "Anna Karenina",
        author: "Leo Tolstoy",
        publishingDate: "1878-01-01",
        description:
          "A married woman's doomed love affair unfolds against a broader portrait of Russian society.",
      },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        publishingDate: "1866-01-01",
        description:
          "A poor former student in St. Petersburg wrestles with guilt after committing a terrible crime.",
      },
      {
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        publishingDate: "1880-11-01",
        description:
          "Three brothers confront questions of faith, morality, and family in the wake of their father's murder.",
      },
      {
        title: "Wuthering Heights",
        author: "Emily Bronte",
        publishingDate: "1847-12-01",
        description:
          "A dark, passionate story of love and revenge that spans two generations on the Yorkshire moors.",
      },
      {
        title: "Jane Eyre",
        author: "Charlotte Bronte",
        publishingDate: "1847-10-16",
        description:
          "An orphaned governess finds her independence and unexpected love while facing hardship and mystery.",
      },
      {
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        publishingDate: "1890-07-01",
        description:
          "A young man stays eternally youthful while his portrait bears the visible marks of his moral decay.",
      },
      {
        title: "Alice's Adventures in Wonderland",
        author: "Lewis Carroll",
        publishingDate: "1865-11-26",
        description:
          "A young girl falls down a rabbit hole into a nonsensical world full of strange creatures and logic.",
      },
      {
        title: "The Count of Monte Cristo",
        author: "Alexandre Dumas",
        publishingDate: "1844-08-28",
        description:
          "A man wrongfully imprisoned escapes to reinvent himself and exact an elaborate revenge on his betrayers.",
      },
      {
        title: "Les Miserables",
        author: "Victor Hugo",
        publishingDate: "1862-01-01",
        description:
          "A former convict seeks redemption while pursued by a relentless inspector amid the unrest of 19th-century France.",
      },
      {
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        publishingDate: "1605-01-16",
        description:
          "An aging man convinced he is a knight sets out on absurd, chivalrous adventures with his loyal squire.",
      },
      {
        title: "The Odyssey",
        author: "Homer",
        publishingDate: "0800-01-01",
        description:
          "A hero's long, perilous journey home after war, filled with monsters, gods, and tests of endurance.",
      },
      {
        title: "Middlemarch",
        author: "George Eliot",
        publishingDate: "1871-12-01",
        description:
          "A sweeping portrait of provincial life, following the intertwined ambitions and disappointments of a small English town.",
      },
    ];

    const existingBooks = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM `Books`",
    );

    if (existingBooks[0].count > 0) {
      console.log("The books already exist, skipping the seeder.");
      return;
    }

    for (const { author, ...book } of books) {
      const authorObj = { name: author };

      const [createdAuthor] = await Author.findOrCreate({
        where: { name: author },
        defaults: { name: author },
      });

      const createdBook = await Book.create(book);
      await createdBook.addAuthor(createdAuthor);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AuthorBook", null, {});
    await queryInterface.bulkDelete("Books", null, {});
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
