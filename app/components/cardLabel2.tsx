import React from "react";

type labelProps = {
	name: string;
	description?: string;

	shopNow?: string;
};

export default function CardLabel2({ name, description, shopNow }: labelProps) {
	return (
		<div className="absolute bottom-8 left-8 text-white">
			<p className="text-3xl  ">{name}</p>
			<p className="font-extralight">{description}</p>

			<p className="border-b-[1px] w-[85px] mt-3">{shopNow}</p>
		</div>
	);
}
