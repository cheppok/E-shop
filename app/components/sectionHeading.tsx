import React from "react";

type titleProps = {
	title: string;
	height?: string; // Optional prop for height
	width?: string; // Optional prop for width
};

export default function SectionHeading({ title, height, width }: titleProps) {
	return (
		<div className="ml-32 mt-4 mb-4 font-semibold">
			<p className={` ${height} ${width} text-3xl`}>{title}</p>
		</div>
	);
}
