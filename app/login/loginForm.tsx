"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
	username: z.string().min(2).max(50),
	email: z.string().email(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(
			/[^A-Za-z0-9]/,
			"Password must contain at least one special character"
		),
});

export function LoginForm() {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
		},
	});
	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-col justify-center"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className=" ">
							<FormLabel>email</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="  ">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder=" "
									{...field}
									className="p-2"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-1/5 self-center mt-4 ">
					Submit
				</Button>
				<div className="italic flex justify-center gap-2 text-xl p-3">
					<span className="text-red-700">Dont have account? </span>
					<Link href={"/signUp"} className="underline">
						sign up
					</Link>
				</div>
			</form>
		</Form>
	);
}
