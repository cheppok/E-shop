// "use client";

// import React, { useState } from "react";
// import Input from "../components/input/input";
// import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
// import Link from "next/link";
// import Image from "next/image";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const RegisterForm = () => {
// 	const router = useRouter();
// 	const [isLoading, setIsLoading] = useState(false);

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<FieldValues>({
// 		defaultValues: {
// 			name: "",
// 			email: "",
// 			password: "",
// 			confirmPassword: "",
// 		},
// 	});

// 	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
// 		setIsLoading(true);

// 		// Optional: Confirm password match
// 		if (data.password !== data.confirmPassword) {
// 			alert("Passwords do not match.");
// 			setIsLoading(false);
// 			return;
// 		}

// 		try {
// 			const response = await fetch("/api/register", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify(data),
// 			});

// 			if (!response.ok) {
// 				throw new Error("Failed to register user");
// 			}

// 			const result = await response.json();
// 			console.log("User created:", result);

// 			// ✅ Redirect to login page
// 			router.push("/sign-in");
// 		} catch (error) {
// 			console.error("Registration error:", error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};
// 	return (
// 		<>
// 			<button
// 				onClick={() => {
// 					signIn("google");
// 				}}
// 				className="self-center-safe w-2/4   font-bold border-2 border-slate-300 rounded-md mb-6 cursor-pointer "
// 			>
// 				<div className="flex justify-center gap-4 pt-3 pb-2 ">
// 					<Image src={"/google2.png"} height={20} width={20} alt="" />
// 					<p>Sign up with google</p>
// 				</div>
// 			</button>
// 			<div className="w-2/4 self-center-safe mb-6">
// 				<Input
// 					id="name"
// 					label="name"
// 					disabled={isLoading}
// 					errors={errors}
// 					register={register}
// 					required
// 				/>
// 			</div>
// 			<div className="w-2/4 self-center-safe mb-6 ">
// 				<Input
// 					id="email"
// 					type="email"
// 					label="email"
// 					disabled={isLoading}
// 					errors={errors}
// 					register={register}
// 					required
// 				/>
// 			</div>
// 			<div className="w-2/4 self-center-safe mb-6 ">
// 				<Input
// 					id="password"
// 					label="password"
// 					disabled={isLoading}
// 					errors={errors}
// 					register={register}
// 					required
// 					type="password"
// 				/>
// 			</div>
// 			<div className="w-2/4 self-center-safe mb-6">
// 				<Input
// 					id="confirmPassword"
// 					label="confirm password"
// 					disabled={isLoading}
// 					errors={errors}
// 					register={register}
// 					required
// 					type="password"
// 				/>
// 			</div>
// 			<button
// 				type="submit"
// 				onClick={handleSubmit(onSubmit)}
// 				className="bg-black text-white rounded-2xl p-2 w-2/12 self-center-safe mt-12"
// 			>
// 				{isLoading ? "loading" : "Sign Up"}
// 			</button>
// 			<div className="flex gap-4 justify-center text-xl mt-12">
// 				<p>Already have an account?</p>
// 				<Link href={"/sign-in"} className="underline italic">
// 					Login
// 				</Link>
// 			</div>
// 		</>
// 	);
// };

// export default RegisterForm;
"use client";

import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "../components/input/input";
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
		watch,
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

			router.push("/sign-in");
		} catch (error) {
			console.error("Registration error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Watch password to validate confirmPassword
	const password = watch("password");

	return (
		<>
			{/* Google sign-up button */}
			<button
				onClick={() => {
					signIn("google");
				}}
				className="self-center-safe w-2/4 font-bold border-2 border-slate-300 rounded-md mb-6 cursor-pointer"
			>
				<div className="flex justify-center gap-4 pt-3 pb-2">
					<Image
						src={"/google2.png"}
						height={20}
						width={20}
						alt="Google"
					/>
					<p>Sign up with Google</p>
				</div>
			</button>

			{/* Name */}
			<div className="w-2/4 self-center-safe mb-6">
				<Input
					id="name"
					label="name"
					type="text"
					register={register}
					validation={{
						required: "name is required",
					}}
					errors={errors}
					disabled={isLoading}
				/>
			</div>

			{/* Email */}
			<div className="w-2/4 self-center-safe mb-6">
				<Input
					id="email"
					label="Email"
					type="email"
					register={register}
					validation={{
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Enter a valid email address",
						},
					}}
					errors={errors}
					disabled={isLoading}
				/>
			</div>

			{/* Password */}
			<div className="w-2/4 self-center-safe mb-6">
				<Input
					id="password"
					label="Password"
					type="password"
					register={register}
					validation={{ required: "Password is required" }}
					errors={errors}
					disabled={isLoading}
				/>
			</div>

			{/* Confirm Password */}
			<div className="w-2/4 self-center-safe mb-6">
				<Input
					id="confirmPassword"
					label="Confirm Password"
					type="password"
					register={register}
					validation={{
						required: "Please confirm your password",
						validate: (value: string) =>
							value === password || "Passwords do not match", // ✅ now password is used
					}}
					errors={errors}
					disabled={isLoading}
				/>
				{errors.confirmPassword && (
					<span className="text-red-500 text-sm">
						{errors.confirmPassword.message?.toString()}
					</span>
				)}
			</div>
			{/* Submit */}
			<button
				type="submit"
				onClick={handleSubmit(onSubmit)}
				disabled={isLoading}
				className="bg-black text-white rounded-2xl p-2 w-2/12 self-center-safe mt-12 disabled:opacity-50"
			>
				{isLoading ? "Loading..." : "Sign Up"}
			</button>

			{/* Link to login */}
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
