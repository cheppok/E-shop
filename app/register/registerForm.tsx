"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/input/input";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type RegisterFormData = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const RegisterForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormData>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const password = watch("password");

	const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
		setIsLoading(true);

		if (data.password !== data.confirmPassword) {
			alert("Passwords do not match.");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Failed to register user");

			router.push("/sign-in");
		} catch (err) {
			console.error("Registration error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-center gap-6 w-full max-w-md mx-auto"
		>
			{/* Google sign-up */}
			<button
				type="button"
				onClick={() => signIn("google")}
				className="w-full font-bold border-2 border-slate-300 rounded-md mb-6 flex justify-center items-center gap-4 p-2"
			>
				<Image src="/google2.png" width={20} height={20} alt="Google" />
				Sign up with Google
			</button>

			{/* Name */}
			<Input<RegisterFormData>
				id="name"
				label="Name"
				register={register}
				validation={{ required: "Name is required" }}
				errors={errors}
				disabled={isLoading}
			/>

			{/* Email */}
			<Input<RegisterFormData>
				id="email"
				label="Email"
				type="email"
				register={register}
				validation={{
					required: "Email is required",
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: "Enter a valid email",
					},
				}}
				errors={errors}
				disabled={isLoading}
			/>

			{/* Password */}
			{/* Password */}
			<Input<RegisterFormData>
				id="password"
				label="Password"
				type="password"
				register={register}
				validation={{
					required: "Password is required",
					minLength: {
						value: 6,
						message: "Password must be at least 6 characters",
					},
				}}
				errors={errors}
				disabled={isLoading}
			/>

			{/* Confirm Password */}
			<Input<RegisterFormData>
				id="confirmPassword"
				label="Confirm Password"
				type="password"
				register={register}
				validation={{
					required: "Please confirm password",
					validate: (value: string) =>
						value === password || "Passwords do not match",
				}}
				errors={errors}
				disabled={isLoading}
			/>

			{/* Submit */}
			<button
				type="submit"
				disabled={isLoading}
				className="bg-black text-white rounded-2xl p-2 w-2/5 disabled:opacity-50 mt-4"
			>
				{isLoading ? "Loading..." : "Sign Up"}
			</button>

			{/* Link to login */}
			<div className="flex gap-4 justify-center text-xl mt-6">
				<p>Already have an account?</p>
				<Link href="/sign-in" className="underline italic">
					Login
				</Link>
			</div>
		</form>
	);
};

export default RegisterForm;
