const { z } = require("zod");

const createRentalSchema = z.object({
  books: z.array(z.number()).min(1),
});

module.exports = createRentalSchema;
