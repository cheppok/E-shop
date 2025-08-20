

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from './../../prisma/prisma';


export async function POST(request: Request) {
	try {
		const { name, email, password } = await request.json();

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Something went wrong during registration." },
			{ status: 500 }
		);
	}
}
