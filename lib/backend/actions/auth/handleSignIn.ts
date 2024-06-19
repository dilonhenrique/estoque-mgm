import {
  User as NextAuthUser,
  Account as NextAuthAccount,
  Profile as NextAuthProfile,
} from "next-auth";
import { validatePresent } from "@/utils/errorUtils";
import { userService } from "../../services/users";

export default async function handleSignIn(
  user: NextAuthUser,
  account: NextAuthAccount | null,
  profile: NextAuthProfile | undefined
) {
  validatePresent(user.email, "No email found in user object");

  await userService.upsert({
    name: user.name as string,
    email: user.email as string,
    img_url: user.image as string | undefined,
  });
}
