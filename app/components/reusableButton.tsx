import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	bgColor?: string; // Background color
	height?: string; // Height (e.g. "40px", "3rem")
	width?: string; // Width (e.g. "100px", "50%")
	borderRadius?: string;
	children: React.ReactNode;
}

const ReUsableButton: React.FC<ButtonProps> = ({
	bgColor = "#007bff", // default blue
	height = "40px",
	width = "auto",
	children,
	style,

	...rest
}) => {
	return (
		<button
			style={{
				backgroundColor: bgColor,
				height,
				width,
				border: "none",
				borderRadius: "6px",
				color: "#fff",
				cursor: "pointer",
				...style,
			}}
			{...rest}
		>
			{children}
		</button>
	);
};

export default ReUsableButton;
