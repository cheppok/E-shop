"use client";

import React, { useState } from "react";
import Input from "../components/input/input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignInForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		setErrorMsg("");

		try {
			const res = await signIn("credentials", {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (res?.ok) {
				router.push("/cart");
				router.refresh();
			} else {
				setErrorMsg("Invalid email or password.");
			}
		} catch (err) {
			console.error("Login error", err);
			setErrorMsg("Something went wrong. Try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
			{/* Google Sign-in */}
			<button
				type="button"
				onClick={() => signIn("google")}
				disabled={isLoading}
				className="w-full font-bold border-2 border-slate-300 rounded-lg mb-6 pl-2 pr-2 cursor-pointer"
			>
				<div className="flex justify-center gap-4 pt-3 pb-2">
					<Image
						src={"/google2.png"}
						height={20}
						width={20}
						alt="Google"
					/>
					<p>Continue with Google</p>
				</div>
			</button>

			{/* Email input */}
			<div className="mb-6">
				<Input
					id="email"
					label="Email"
					disabled={isLoading}
					errors={errors}
					register={register}
					required
				/>
			</div>

			{/* Password input */}
			<div className="mb-6">
				<Input
					id="password"
					label="Password"
					disabled={isLoading}
					errors={errors}
					register={register}
					required
					type="password"
				/>
			</div>

			{/* Error Message */}
			{errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

			{/* Submit */}
			<div className="flex justify-center mb-8">
				<button
					type="submit"
					disabled={isLoading}
					className="bg-black text-white rounded-2xl p-2 w-2/6 mt-4"
				>
					{isLoading ? "Loading..." : "Log in"}
				</button>
			</div>

			{/* Link to sign-up */}
			<div className="flex gap-2 justify-center text-sm">
				<p>Don’t have an account?</p>
				<Link href="/register" className="underline italic">
					Sign Up
				</Link>
			</div>
		</form>
	);
};

export default SignInForm;

// "use client";

// import React, { useState } from "react";
// import Input from "../components/input/input";
// import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const SignInForm = () => {
// 	const router = useRouter();
// 	const [isLoading, setIsLoading] = useState(false);

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<FieldValues>({
// 		defaultValues: {
// 			email: "",
// 			password: "",
// 		},
// 	});

// 	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
// 		setIsLoading(true);

// 		try {
// 			const res = await signIn("credentials", {
// 				email: data.email,
// 				password: data.password,

// 				redirect: false, // <– Important to avoid full redirect
// 			});

// 			if (res?.ok) {
// 				router.push("/cart"); // Navigate first
// 				router.refresh(); // ✅ Refresh session/server-side props
// 				alert("successfully logged in");
// 			} else {
// 				alert("Invalid email or password");
// 			}
// 		} catch (err) {
// 			console.error("Login error", err);
// 			alert("Something went wrong. Try again.");
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
// 				className="self-center-safe w-full  font-bold border-2 border-slate-300 rounded-md mb-6 cursor-pointer "
// 			>
// 				<div className="flex justify-center gap-4 pt-3 pb-2 ">
// 					<Image src={"/google2.png"} height={10} width={20} alt="" />
// 					<p>Continue with google</p>
// 				</div>
// 			</button>
// 			<div className="w-full self-center-safe mb-6 ">
// 				<div className="">
// 					<Input
// 						id="email"
// 						label="email"
// 						disabled={isLoading}
// 						errors={errors}
// 						register={register}
// 						required
// 					/>
// 				</div>
// 			</div>
// 			<div className="w-full self-center-safe mb-12 ">
// 				<div className="">
// 					<Input
// 						id="password"
// 						label="password"
// 						disabled={isLoading}
// 						errors={errors}
// 						register={register}
// 						required
// 						type="password"
// 					/>
// 				</div>
// 			</div>
// 			<div className="flex justify-center mb-12">
// 				<button
// 					onClick={handleSubmit(onSubmit)}
// 					className="bg-black text-white rounded-2xl p-2 w-2/6 mt-4"
// 				>
// 					{isLoading ? "loading" : "Log in"}
// 				</button>
// 			</div>

// 			<div className="flex gap-4 justify-center text-xl mt-4">
// 				<p>Don not have an account?</p>
// 				<Link href={"/register"} className="underline italic">
// 					Sign Up
// 				</Link>
// 			</div>
// 		</>
// 	);
// };

// export default SignInForm;
