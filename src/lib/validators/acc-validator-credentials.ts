import { z } from "zod";

export const AuthCreadentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

export type TAuthCredentialsValidator = z.infer<typeof AuthCreadentialsValidator>;
