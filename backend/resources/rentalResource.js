const rentalResource = (rental) => {
  return { id: rental.id, books: rental.Books };
};

const rentalCollection = (rentals) => {
  return rentals.map(rentalResource);
};

module.exports = { rentalResource, rentalCollection };
