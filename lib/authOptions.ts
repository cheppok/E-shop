// import { prisma } from '@/lib/prisma';
// import type { AuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import bcrypt from "bcrypt";
// // import { prisma } from "@/prisma/prisma";


// function getEnvVar(key: string): string {
//   const value = process.env[key];
//   if (!value) throw new Error(`❌ Missing environment variable: ${key}`);
//   return value;
// }

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: getEnvVar("GITHUB_ID"),
//       clientSecret: getEnvVar("GITHUB_SECRET"),
//     }),
//     GoogleProvider({
//       clientId: getEnvVar("GOOGLE_ID"),
//       clientSecret: getEnvVar("GOOGLE_SECRET"),
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error("Invalid email or password");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user?.hashedPassword) {
//           throw new Error("Invalid email or password");
//         }

//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isCorrectPassword) {
//           throw new Error("Invalid email or password");
//         }

//         return user;
//       },
//     }),
//   ],
//   pages: { signIn: "/sign-in" },
//   debug: process.env.NODE_ENV === "development",
//   session: { strategy: "jwt" },
//   secret: getEnvVar("NEXTAUTH_SECRET"),
// };

import { prisma } from "@/lib/prisma";
import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`❌ Missing environment variable: ${key}`);
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

  callbacks: {
    // Handle Google image → Cloudinary upload
    async signIn({ user }) {
      try {
        if (user?.image && !user.image.includes("res.cloudinary.com")) {
          const uploaded = await cloudinary.uploader.upload(user.image, {
            folder: "user_profiles",
            public_id: `user_${user.email?.split("@")[0]}`,
            overwrite: true,
          });

          // Persist Cloudinary image URL in DB
          await prisma.user.update({
            where: { email: user.email! },
            data: { image: uploaded.secure_url },
          });

          user.image = uploaded.secure_url; // replace for this session too
        }
      } catch (err) {
        console.error("⚠️ Cloudinary upload failed:", err);
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user?.image) token.picture = user.image;
      return token;
    },

    async session({ session, token }) {
      if (token.picture) session.user.image = token.picture as string;
      return session;
    },
  },
};
