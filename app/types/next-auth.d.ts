import  { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    hashedPassword?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // 👇 Add this so session.user.hashedPassword won’t error
      hashedPassword?: string | null;
    } & DefaultSession["user"];
  }
}
