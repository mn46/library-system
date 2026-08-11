const { z } = require("zod");

const createRentalSchema = z.object({
  userId: z.number(),
  books: z.array(z.number()).min(1),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({ errors: result.error.flatten() });
  }
  req.validated = result.data;
  next();
};

module.exports = { createRentalSchema, validate };
