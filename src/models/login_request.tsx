import { z } from "zod";

const loginRequest = z.object({
  email: z.string().email("Invalid Email"),
  password: z.string(),
});
const userCreationRequest = z.object({
  name: z.string(),
  email: z.string().email("Invalid Email"),
  password: z.string(),
  mobile: z.string(),
});
export type loginRequestinput = z.infer<typeof loginRequest>;

export type UserCreationRequest = z.infer<typeof userCreationRequest>;
