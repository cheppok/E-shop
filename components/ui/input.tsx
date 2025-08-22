// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Input }

import * as React from "react";
import { UseFormRegister, FieldValues, RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils";

interface InputProps {
	id: string;
	label: string;
	type?: string;
	className?: string;
	disabled?: boolean;
	register: UseFormRegister<FieldValues>;
	validation?: RegisterOptions;
	error?: string;
}

function Input({
	id,
	label,
	type = "text",
	className,
	disabled,
	register,
	validation,
	error,
	...props
}: InputProps) {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label htmlFor={id} className="text-sm font-medium text-foreground">
				{label}
			</label>

			<input
				id={id}
				type={type}
				disabled={disabled}
				aria-invalid={!!error}
				className={cn(
					"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					className
				)}
				{...register(id, validation)}
				{...props}
			/>

			{error && <p className="text-red-500 text-xs">{error}</p>}
		</div>
	);
}

export { Input };
