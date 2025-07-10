import React from "react";
import { SignUPForm } from "./signUpForm";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const SignUp = () => {
	return (
		<div className="flex flex-col">
			<div className="text-3xl font-bold  flex gap-2 justify-center m-6">
				<span className={`${redressed.className}`}>E-shop</span> Sign Up
			</div>
			<SignUPForm />
		</div>
	);
};

export default SignUp;
