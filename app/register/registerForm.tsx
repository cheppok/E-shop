"use client";

import React, { useState } from "react";
import Input from "../components/input/input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		// Optional: Confirm password match
		if (data.password !== data.confirmPassword) {
			alert("Passwords do not match.");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to register user");
			}

			const result = await response.json();
			console.log("User created:", result);

			// ✅ Redirect to login page
			router.push("/sign-in");
		} catch (error) {
			console.error("Registration error:", error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<button
				onClick={() => {
					signIn("google");
				}}
				className="self-center-safe w-2/4   font-bold border-2 border-slate-300 rounded-md mb-6 cursor-pointer "
			>
				<div className="flex justify-center gap-4 pt-3 pb-2 ">
					<Image src={"/google2.png"} height={20} width={20} alt="" />
					<p>Sign up with google</p>
				</div>
			</button>
			<div className="w-2/4 self-center-safe mb-6">
				<Input
					id="name"
					label="name"
					disabled={isLoading}
					errors={errors}
					register={register}
					required
				/>
			</div>
			<div className="w-2/4 self-center-safe mb-6 ">
				<Input
					id="email"
					label="email"
					disabled={isLoading}
					errors={errors}
					register={register}
					required
				/>
			</div>
			<div className="w-2/4 self-center-safe mb-6 ">
				<Input
					id="password"
					label="password"
					disabled={isLoading}
					errors={errors}
					register={register}
					required
					type="password"
				/>
			</div>
			<div className="w-2/4 self-center-safe mb-6">
				<Input
					id="confirmPassword"
					label="confirm password"
					disabled={isLoading}
					errors={errors}
					register={register}
					required
					type="password" 
				/>
			</div>
			<button
				type="submit"
				onClick={handleSubmit(onSubmit)}
				className="bg-black text-white rounded-2xl p-2 w-2/12 self-center-safe mt-12"
			>
				{isLoading ? "loading" : "Sign Up"}
			</button>
			<div className="flex gap-4 justify-center text-xl mt-12">
				<p>Already have an account?</p>
				<Link href={"/sign-in"} className="underline italic">
					Login
				</Link>
			</div>
		</>
	);
};

export default RegisterForm;
