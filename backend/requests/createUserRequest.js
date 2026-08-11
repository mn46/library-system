const { z } = require("zod");

const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(10),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({ errors: result.error.flatten() });
  }
  req.validated = result.data;
  next();
};

module.exports = { createUserSchema, validate };
