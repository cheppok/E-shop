"use client";

import React from "react";
import Image from "next/image";
import { TruncateText } from "../../../utils/truncateText";
import { useRouter } from "next/navigation";
import FormatPrice from "../../../utils/formatPrice";
import { Rating } from "@mui/material";
import { useCart } from "../../hooks/useCart";
import { productType, cartProductType, reviewType } from "../../types/types";

// productCard.tsx
interface ProductCardProps {
	data: productType; // instead of cartProductType
}

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
	const router = useRouter();
	const { handleAddItemsToCart, cartItems } = useCart();

	// Check if product is already in cart
	const isItemInCart =
		cartItems?.some((item) => item._id === data._id) || false;

	// Prepare cart product
	const cartProduct: cartProductType = {
		_id: data._id,
		name: data.name,
		price: data.price,
		color: data.color,
		imageUrl: data.imageUrl ?? "/placeholder.png",
		quantity: 1, // ✅ force required quantity
		brand: data.brand || "Unknown",
		cartItemId: crypto.randomUUID(),
		description: data.description,
	};

	const reviews = Array.isArray(data?.reviews)
		? (data.reviews as reviewType[])
		: [];

	const productRating =
		reviews.length > 0
			? reviews.reduce((acc, item) => acc + (item?.rating ?? 0), 0) /
			  reviews.length
			: 0;

	return (
		<div
			className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
			onClick={() => router.push(`/product/${data._id}`)}
		>
			<div className="flex flex-col items-center w-full gap-1">
				<div className="aspect-square w-full relative overflow-hidden">
					<Image
						fill
						src={data?.imageUrl || "/placeholder.png"}
						alt={data?.name || "Product image"}
						className="w-full h-full object-contain"
						sizes="full"
					/>
				</div>

				{/* ✅ Add to Cart button now stops navigation */}
				<button
					onClick={(e) => {
						e.stopPropagation(); // ✅ prevent navigation
						if (cartProduct) {
							handleAddItemsToCart(cartProduct);
						}
					}}
					className="w-[230px] text-white bg-gray-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-b-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					{isItemInCart ? "In Cart" : "Add to Cart"}
				</button>
			</div>

			<div>{TruncateText(data?.name || "Unnamed Product")}</div>
			<div className="font-bold">{FormatPrice(data?.price || 0)}</div>
			<div className="mb-6">
				<Rating value={productRating} readOnly />
			</div>
			<p className="text-sm italic">click image for details</p>
		</div>
	);
};
