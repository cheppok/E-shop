// import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

// interface inputProps {
// 	id: string;
// 	label: string;
// 	type?: string;
// 	disabled?: boolean;
// 	required?: boolean;
// 	register: UseFormRegister<FieldValues>;
// 	errors: FieldErrors;
// }

// const Input: React.FC<inputProps> = ({
// 	id,
// 	label,
// 	type,
// 	disabled,
// 	required,
// 	register,
// 	errors,
// }) => {
// 	return (
// 		<div className="w-full relative">
// 			<input
// 				autoComplete="off"
// 				id={id}
// 				disabled={disabled}
// 				{...register(id, { required })}
// 				placeholder=""
// 				type={type}
// 				className={`peer w-full p- pt-5 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed
//                     ${errors[id] ? "border-rose-400" : "border-slate-300"}
//                     ${
// 						errors[id]
// 							? "focus:border-rose-400"
// 							: "focus:border-slate-200"
// 					}`}
// 			/>
// 			<label
// 				htmlFor={id}
// 				className={`absolute  cursor-text  text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4  ${
// 					errors[id] ? "focus:text-rose-500" : "focus:text-slate-400"
// 				}`}
// 			>
// 				{label}{" "}
// 			</label>
// 		</div>
// 	);
// };

// export default Input;

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
