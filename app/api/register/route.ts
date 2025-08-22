

// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";
// import { prisma } from '../../../lib/prisma';



// export async function POST(request: Request) {
// 	try {
// 		const { name, email, password } = await request.json();

// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		const user = await prisma.user.create({
// 			data: {
// 				name,
// 				email,
// 				hashedPassword,
// 			},
// 		});

// 		return NextResponse.json(user);
// 	} catch (error) {
// 		console.error("Registration error:", error);
// 		return NextResponse.json(
// 			{ error: "Something went wrong during registration." },
// 			{ status: 500 }
// 		);
// 	}
// }

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // ✅ Basic validation
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: "All fields (name, email, password) are required." },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }, // never return password
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
