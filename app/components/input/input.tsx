"use client";

import * as React from "react";
import {
	UseFormRegister,
	RegisterOptions,
	FieldErrors,
	FieldValues,
	Path,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type InputProps<T extends FieldValues> = {
	id: Path<T>;
	label: string;
	type?: string;
	disabled?: boolean;
	register: UseFormRegister<T>;
	validation?: RegisterOptions<T, Path<T>>;
	errors?: FieldErrors<T>;
};

export function Input<T extends FieldValues>({
	id,
	label,
	type = "text",
	disabled,
	register,
	validation,
	errors,
}: InputProps<T>) {
	const [show, setShow] = React.useState(false);
	const isPassword = type === "password";

	return (
		<div className="flex flex-col gap-1 w-full">
			<label htmlFor={id}>{label}</label>
			<div className="relative">
				<input
					id={id}
					type={isPassword && show ? "text" : type}
					{...register(id, validation)}
					disabled={disabled}
					className={cn(
						"border rounded px-2 py-1 w-full pr-10", // add padding for icon
						errors?.[id] && "border-red-500"
					)}
				/>
				{isPassword && (
					<button
						type="button"
						onClick={() => setShow(!show)}
						className="absolute inset-y-0 right-2 flex items-center text-gray-500"
					>
						{show ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				)}
			</div>
			{errors?.[id] && (
				<span className="text-red-500 text-sm">
					{errors[id]?.message?.toString() ||
						"This field is required"}
				</span>
			)}
		</div>
	);
}
