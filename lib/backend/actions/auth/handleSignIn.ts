import {
  User as NextAuthUser,
  Account as NextAuthAccount,
  Profile as NextAuthProfile,
} from "next-auth";
import { validatePresent } from "@/utils/errorUtils";
import { userService } from "../../services/users";
import { UserInput } from "../../../../types/schemas";

export default async function handleSignIn(
  user: NextAuthUser,
  account: NextAuthAccount | null,
  profile: NextAuthProfile | undefined
) {
  validatePresent(user.email, "No email found in user object");

  await userService.upsert(user as UserInput);
}
