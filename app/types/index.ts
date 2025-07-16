import { User, 
    // Role
 } from "@prisma/client";

// SafeUser omits hashedPassword and serializes dates to strings
export type SafeUser = Omit<
	User,
	"createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
	hashedPassword?: string | null; // optional: include it if you need it in server components
};
