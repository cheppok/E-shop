"use client";
import React from "react";
import Image from "next/image";
import { TruncateText } from "../../../utils/truncateText";
import { useRouter } from "next/navigation";

import FormartPrice from "../../../utils/formartPrice";
// import { Rating } from "@mui/material";

interface productCardProps {
	data: any;
}

export const ProductCard: React.FC<productCardProps> = ({ data }) => {
	// const Rating =
	// 	data.reviews.reduce((acc: number, item) => item.rating + acc) /
	// 	data.reviews.length;

	const Router = useRouter();

	return (
		<div
			className="col-span-1 cursor-pointer border-[1.2px]  border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
			onClick={() => Router.push(`/product/${data.id}`)}
		>
			<div className="flex flex-col items-center w-full gap-1">
				<div className="aspect-square w-full relative overflow-hidden">
					<Image
						fill
						src={data.images[0].image}
						alt=""
						className=" w-full h-full object-contain "
					/>
				</div>
				<div className="mt-4">{TruncateText(data.name)}</div>
				<div> {data.reviews.length} Reviews</div>
				<div className="font-bold"> {FormartPrice(data.price)}</div>
				<div>{/* <Rating value={Rating} readOnly /> */}</div>
			</div>
		</div>
	);
};
