"use client";
import React from "react";
import {
	// UseFormRegister,
	// FieldValues,
	FieldErrors,
	useForm,
} from "react-hook-form";
type InputProps = {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	required?: boolean;
	errors?: FieldErrors;
	register: ReturnType<typeof useForm>["register"];
};

const Input: React.FC<InputProps> = ({
	id,
	label,
	type = "text",
	disabled,
	required,
	errors,
	register,
}) => {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type}
				{...register(id, { required })}
				disabled={disabled}
				className="border rounded px-2 py-1"
			/>
			{errors?.[id] && (
				<span className="text-red-500 text-sm">
					This field is required
				</span>
			)}
		</div>
	);
};
export default Input;
