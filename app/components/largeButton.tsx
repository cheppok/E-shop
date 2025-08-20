import React from "react";

type TitleProps = {
	name: string;
	bgColor?: string; // Optional prop for background color
	height?: string; // Optional prop for height
	width?: string; // Optional prop for width
};

export default function LargeButton({
	name,
	bgColor = "bg-red-600",
	height = "h-14",
	width = "w-48",
}: TitleProps) {
	return (
		<button
			type="submit"
			className={`${bgColor} ${height} ${width} rounded-md text-white text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
		>
			{name}
		</button>
	);
}

// usage..........
{
	/* <LargeButton name="Submit" bgColor="bg-green-600" height="h-16" width="w-56" />
<LargeButton name="Cancel" /> */
}
