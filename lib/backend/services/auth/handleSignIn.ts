import {
  User as NextAuthUser,
  Account as NextAuthAccount,
  Profile as NextAuthProfile,
} from "next-auth";
import { userRepo } from "../../repositories/users";

export default async function handleSignIn(
  user: NextAuthUser,
  account: NextAuthAccount | null,
  profile: NextAuthProfile | undefined
) {
  await userRepo.upsert({
    name: user.name as string,
    email: user.email as string,
    img_url: user.image as string | undefined,
  });
}
