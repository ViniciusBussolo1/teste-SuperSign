import { compareSync } from "bcrypt-ts";
import db from "./db";

export async function findUserByCredentials(email: string, password: string) {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) return null;

  const userValid = compareSync(password, user.password as string);

  if (!userValid) {
    return null;
  }

  return user;
}
