import React from "react";
import SignInForm from "./signInForm";
import Image from "next/image";
import { Redressed } from "next/font/google";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const SignIn = async () => {
	const session = await getServerSession(authOptions);
	if (session) {
		redirect("/"); // or "/dashboard" or wherever
	}
	return (
		<>
			<div className="text-3xl font-bold  flex gap-2 justify-center m-6">
				Log in to{" "}
				<span className={`${redressed.className}`}>E-shop</span>
			</div>
			<div className="flex gap-10 justify-center">
				<div>
					<Image
						src={"/shoppers.jpg"}
						width={350}
						height={200}
						alt=""
						priority
					/>
				</div>
				<div className="mt-28 w-96 ">
					<SignInForm />
				</div>
			</div>
		</>
	);
};

export default SignIn;
