import React from "react";

type labelProps = {
	name: string;
	description?: string;
	moreDescription?: string;
	shopNow?: string;
};

export default function CardLabel({
	name,
	description,
	moreDescription,
	shopNow,
}: labelProps) {
	return (
		<div className="absolute bottom-8 left-8 text-white">
			<p className="text-3xl pb-4 ">{name}</p>
			<p className="font-extralight">{description}</p>
			<p className="font-extralight">{moreDescription}</p>
			<p className="border-b-[1px] w-[85px] mt-3">{shopNow}</p>
		</div>
	);
}
