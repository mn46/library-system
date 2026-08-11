const { z } = require("zod");

const createRentalSchema = z.object({
  userId: z.number(),
  books: z.array(z.number()).min(1),
});

module.exports = createRentalSchema;
