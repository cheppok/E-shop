import React, { useState, useEffect } from "react";
import { productType, cartProductType } from "../../types";
import ReUsableButton from "../reusableButton";
import { useCart } from "../../hooks/useCart";
import { useRouter } from "next/navigation";

interface ItemContentProps {
	product: productType;
}

const ProductCartItemToCart: React.FC<ItemContentProps> = ({ product }) => {
	const { handleAddItemsToCart, cartItems } = useCart();
	const router = useRouter();
	const [isItemInCart, setIsItemInCart] = useState(false);
	const [cartProduct] = useState<cartProductType>({
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
	}, [cartItems, product.id]);

	return (
		<div className=" flex ">
			{" "}
			{isItemInCart ? (
				<div className="flex justify-center w-96 mt-4">
					<ReUsableButton
						onClick={() => {
							router.push("/cart");
						}}
						bgColor="	#3d753b"
						height="3rem"
						width="10rem"
						style={{
							borderRadius: "15px",
							fontStyle: "italic",
							color: "white",
						}}
					>
						{" "}
						<div>ADDED</div>
						<div>VIEW CART</div>
					</ReUsableButton>
				</div>
			) : (
				<div className="flex justify-center w-96 mt-4">
					<ReUsableButton
						onClick={() => handleAddItemsToCart(cartProduct)}
						bgColor="#2596be"
						height="3rem"
						width="10rem"
						style={{
							borderRadius: "15px",
							fontStyle: "italic",
							color: "white",
						}}
					>
						ADD ITEM CART
					</ReUsableButton>
				</div>
			)}
		</div>
	);
};

export default ProductCartItemToCart;
