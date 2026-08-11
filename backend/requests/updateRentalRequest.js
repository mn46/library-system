const { z } = require("zod");

const updateRentalSchema = z.object({
  books: z.array(z.number()).min(1),
});

module.exports = updateRentalSchema;
