import { z } from "zod";

export const eventSchema = z.object({
  nombreVisita: z.string({
    required_error: "Username is required",
  }),
  ausnto: z.string({
      required_error: "asunto is required",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
