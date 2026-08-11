"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      publishingDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Book",
    },
  );

  Book.associate = (models) => {
    Book.belongsToMany(models.Rental, { through: "BookRental" });
    Book.belongsToMany(models.Author, { through: "AuthorBook" });
  };
  return Book;
};
