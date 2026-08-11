"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rental.init(
    {
      userId: DataTypes.INTEGER,
      dateFrom: DataTypes.DATE,
      dateTo: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Rental",
    },
  );

  Rental.associate = (models) => {
    Rental.belongsTo(models.User);
    Rental.belongsToMany(models.Book, { through: "BookRental" });
  };
  return Rental;
};
