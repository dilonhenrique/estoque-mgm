import { z } from "zod";
import { accountSchema } from "./account";
import { addressSchema } from "./address";
import { userSchema } from "./user";

export const signupSchema = z.object({
  account: accountSchema,
  address: addressSchema,
  user: userSchema,
});
