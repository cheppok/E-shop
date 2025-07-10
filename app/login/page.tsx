import React from "react";
import { LoginForm } from "./loginForm";
import Image from "next/image";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Login = () => {
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
					/>
				</div>
				<div className="mt-28 w-96 ">
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default Login;
