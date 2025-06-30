"use client";
import React from "react";
import { useState, useCallback } from "react";

import { SetColor } from "../../components/productcard/setcolor";
import Image from "next/image";
import { reviewsType, SelectedimgType, cartProductType } from "../../types";

interface ProDetailsPageprops {
	product: {
		id: string;
		name: string;
		description: string;
		category: string;
		brand: string;
		selectedimg?: SelectedimgType;
		quantity?: number;
		price: number;

		images: SelectedimgType[];

		inStock: boolean;
		reviews?: reviewsType;
	};
}

export const ProDetailsPage: React.FC<ProDetailsPageprops> = ({ product }) => {
	const [cartProduct, setCartProduct] = useState<cartProductType>({
		id: product.id,
		name: product.name,
		description: product.description,
		category: product.category,
		brand: product.brand,
		selectedimg: {
			color: "Default",
			colorCode: "#000000",
			image: product.images[0].image,
		},
		quantity: 1,
		price: product.price,
	});

	const handleColorSelect = useCallback((value: SelectedimgType) => {
		setCartProduct((prev) => {
			return { ...prev, selectedimg: value };
		});
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 p-8">
			<div>
				<Image
					width={100}
					height={100}
					src={cartProduct.selectedimg.image}
					alt={cartProduct.name}
					className="w-full max-w-md h-auto object-cover rounded-md"
				/>
			</div>

			<div>
				<h1 className="font-bold text-3xl mb-1">{product.name}</h1>
				<p>{product.description}</p>
				<h3 className="font-bold italic mt-2 mb-2">
					CATEGORY: <span> {product.category} </span>
				</h3>
				<h3 className="font-bold italic mb-2">
					BRAND: <span> {product.brand} </span>
				</h3>
				<h3
					className={
						product.inStock ? "text-teal-500 " : "text-rose-400"
					}
				>
					{product.inStock ? "in Stock" : "out of stock"}
				</h3>
				<div>
					<SetColor
						image={product.images}
						cartProduct={cartProduct}
						handleColorSelect={handleColorSelect}
					/>
				</div>
				<div>{product.price}</div>
				<div>{product.quantity}</div>
			</div>
		</div>
	);
};
export default ProDetailsPage;
