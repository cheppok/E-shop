// "use client";

// import React from "react";
// import {
//   FieldErrors,
//   FieldValues,
//   UseFormRegister,
// } from "react-hook-form";

// type InputProps = {
//   id: string;
//   label: string;
//   type?: string;
//   disabled?: boolean;
//   required?: boolean | string; // 👈 allow custom error message
//   errors?: FieldErrors<FieldValues>;
//   register: UseFormRegister<FieldValues>; // ✅ clean typing
// };

// export const Input: React.FC<InputProps> = ({
//   id,
//   label,
//   type = "text",
//   disabled,
//   required,
//   errors,
//   register,
// }) => {
//   return (
//     <div className="flex flex-col gap-1 w-full">
//       <label htmlFor={id} className="text-sm font-medium">
//         {label}
//       </label>
//       <input
//         id={id}
//         type={type}
//         {...register(id, { required })}
//         disabled={disabled}
//         className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
//       />
//       {errors?.[id] && (
//         <span className="text-red-500 text-sm">
//           {typeof required === "string"
//             ? required
//             : "This field is required"}
//         </span>
//       )}
//     </div>
//   );
// };

// export default Input;
"use client";
import React from "react";
import { FieldErrors, useForm } from "react-hook-form";

type InputProps = {
	id: string;
	label: string;
	type?: string;
	disabled?: boolean;
	errors?: FieldErrors;
	register: ReturnType<typeof useForm>["register"];
	validation?: object; // ✅ allows passing required + validate rules
};

export const Input: React.FC<InputProps> = ({
	id,
	label,
	type = "text",
	disabled,
	errors,
	register,
	validation = {},
}) => {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				type={type}
				{...register(id, validation)}
				disabled={disabled}
				className="border rounded px-2 py-1"
			/>
			{errors?.[id] && (
				<span className="text-red-500 text-sm">
					{errors[id]?.message?.toString() ||
						"This field is required"}
				</span>
			)}
		</div>
	);
};
export default Input;
