

import NextAuth, { type AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { prisma } from "../../../prisma/prisma";

// ✅ Helper to ensure env variables exist
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: getEnvVar("GITHUB_ID"),
      clientSecret: getEnvVar("GITHUB_SECRET"),
    }),
    GoogleProvider({
      clientId: getEnvVar("GOOGLE_ID"),
      clientSecret: getEnvVar("GOOGLE_SECRET"),
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: { signIn: "/sign-in" },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: getEnvVar("NEXTAUTH_SECRET"),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
