export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ import from lib, not route
import { prisma } from "@/lib/prisma"; // move prisma client to lib
import { SafeUser } from "@/app/types";

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return null;
    }

    // ✅ normalize dates into strings for serialization
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified
        ? currentUser.emailVerified.toISOString()
        : null,
    };
  } catch (error) {
    console.error("[getCurrentUser] Error:", error);
    return null;
  }
}
