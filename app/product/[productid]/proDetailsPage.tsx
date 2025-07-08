"use client";
import React from "react";
import { useState, useCallback, useEffect } from "react";

import { SetColor } from "../../components/setcolor";
import Image from "next/image";
import { reviewsType, SelectedimgType, cartProductType } from "../../types";
import { Rating } from "@mui/material";
import FormatPrice from "../../../utils/formatPrice";
import { SetQuantity } from "../../components/setQuantity";
import ReUsableButton from "../../components/reusableButton";
import { useCart } from "../../hooks/useCart";
import { useRouter } from "next/navigation";

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
	const { handleAddItemsToCart, cartItems } = useCart();
	const [isItemInCart, setIsItemInCart] = useState(false);
	const router = useRouter();
	// 	const [cartTotalQty, setCartTotalQty] = useState(0);
	// const [isItemOnCart, setIsItemOnCart] = useState(false);

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

	console.log(cartItems);

	useEffect(() => {
		setIsItemInCart(false);
		if (cartItems) {
			const existingIndex = cartItems.findIndex(
				(item) => item.id === product.id
			);
			if (existingIndex > -1) {
				setIsItemInCart(true);
			}
		}

		// return () => {};
	}, [cartItems, product.id]);

	const handleColorSelect = useCallback((value: SelectedimgType) => {
		setCartProduct((prev) => {
			return { ...prev, selectedimg: value };
		});
	}, []);

	const productRating =
		product.reviews && product.reviews.length > 0
			? product.reviews.reduce(
					(acc: number, item) => item.rating + acc,
					0
			  ) / product.reviews.length
			: 0;

	const handleQtyDecrease = useCallback(() => {
		setCartProduct((prev) => {
			if (prev.quantity <= 1) return prev;
			return { ...prev, quantity: prev.quantity - 1 };
		});
	}, []);
	const handleQtyIncrease = useCallback(() => {
		setCartProduct((prev) => {
			return { ...prev, quantity: prev.quantity + 1 };
		});
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 p-8">
			<div className="place-items-end pr-12">
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
				<div className="flex gap-4 text-sm text-slate-700">
					<Rating value={productRating} readOnly />
					<div>{product.reviews?.length} Reviews</div>
				</div>
				<p>{product.description}</p>
				<h3 className="font-bold italic mt-3 ">
					CATEGORY: <span> {product.category} </span>
				</h3>
				<h3 className="font-bold italic mb-2 mt-2">
					BRAND: <span> {product.brand} </span>
				</h3>
				<h3
					className={
						product.inStock ? "text-teal-700 " : "text-rose-400"
					}
				>
					{product.inStock ? "in Stock" : "out of stock"}
				</h3>
				<hr />
				{isItemInCart ? (
					<>
						<div className="flex gap-3 mt-24">
							<span>
								<Image
									src={"/correct.png"}
									height={22}
									width={22}
									alt=""
								/>
							</span>
							<h3>Product in cart</h3>
						</div>
						<div className="flex justify-center w-96 ">
							<ReUsableButton
								onClick={() => {
									router.push("/cart");
								}}
								bgColor="	#000000"
								height="3rem"
								width="10rem"
								style={{
									borderRadius: "15px",
									fontStyle: "italic",
									color: "white",
								}}
							>
								{" "}
								VIEW CART
							</ReUsableButton>
						</div>
					</>
				) : (
					<>
						<div>
							<SetColor
								image={product.images}
								cartProduct={cartProduct}
								handleColorSelect={handleColorSelect}
							/>
						</div>
						<div className=" flex gap-6 mt-4">
							<span>Price:</span>
							{FormatPrice(product.price)}
						</div>
						<div className="flex gap-8 mt-4">
							<span className="flex justify-start items-center">
								QUANTITY:
							</span>
							<div className="flex justify-center items-center">
								<SetQuantity
									cartProduct={cartProduct}
									handleQtyDecrease={handleQtyDecrease}
									handleQtyIncrease={handleQtyIncrease}
								/>
							</div>
						</div>
						<div className="flex justify-center w-96 mt-24">
							<ReUsableButton
								onClick={() => {
									handleAddItemsToCart(cartProduct);
								}}
								bgColor="	#000000"
								height="3rem"
								width="10rem"
								style={{
									borderRadius: "15px",
									fontStyle: "italic",
									color: "white",
								}}
							>
								{" "}
								ADD TO CART
							</ReUsableButton>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
export default ProDetailsPage;
