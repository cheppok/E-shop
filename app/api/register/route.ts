

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
import { prisma } from "@/lib/prisma";  // ✅ use singleton import

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    // ✅ hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ create user
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
      }, // don’t return hashed password
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
