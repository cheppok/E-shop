"use client";
import React from "react";
import Image from "next/image";
import { TruncateText } from "../../../utils/truncateText";
import { useRouter } from "next/navigation";

import FormatPrice from "../../../utils/formatPrice";
import { Rating } from "@mui/material";
import ProductCartItemToCart from "./pruductCardItemtoCart";
import { productType } from "../../types";

interface productCardProps {
	data: any;
	product: productType;
}

export const ProductCard: React.FC<productCardProps> = ({ data, product }) => {
	const productRating =
		data.reviews.length > 0
			? data.reviews.reduce(
					(acc: number, item: any) => item.rating + acc,
					0
			  ) / data.reviews.length
			: 0;

	const Router = useRouter();

	return (
		<>
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
							sizes="full"
						/>
					</div>
					<div className="mt-4">{TruncateText(data.name)}</div>
					<div> {data.reviews?.length} Reviews</div>
					<div className="font-bold"> {FormatPrice(data.price)}</div>
					<div>
						<Rating value={productRating} readOnly />
					</div>
				</div>
			</div>
			<div className=" cursor-pointer">
				<ProductCartItemToCart product={product} />
			</div>
		</>
	);
};
