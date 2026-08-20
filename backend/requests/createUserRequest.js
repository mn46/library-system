const { z } = require("zod");

const createUserSchema = z
  .object({
    email: z.email(),
    password: z.string().min(10),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match.",
    path: ["repeatPassword"],
  });

module.exports = createUserSchema;
