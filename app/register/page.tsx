import React from "react";
import Container from "../components/container";
import RegisterForm from "./registerForm";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Register = () => {
	return (
		<div>
			<Container>
				<div className="flex flex-col ">
					<div className="text-3xl font-bold  flex gap-2 justify-center m-6">
						Sign up to{" "}
						<span className={`${redressed.className}`}>E-shop</span>
					</div>
					<RegisterForm />
				</div>
			</Container>
		</div>
	);
};

export default Register;
