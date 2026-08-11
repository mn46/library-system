const { z } = require("zod");

const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(10),
});

module.exports = createUserSchema;
