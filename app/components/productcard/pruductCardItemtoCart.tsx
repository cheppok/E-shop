import React, { useState, useEffect, useMemo } from "react";
import { productType, cartProductType } from "../../types/types";
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

	// Use useMemo to create the cartProduct object only when the product prop changes.
	const cartProduct = useMemo<cartProductType>(() => {
		return {
			_id: product.id,
			name: product.name,
			description: product.description,
			category: product.category,
			brand: product.brand,
			color: product.color,
			imageURL: product.imageUrl,
			selectedimg: {
				color: "Default",
				colorCode: "#000000",
				image:
					product?.images?.[0]?.image ||
					product?.imageUrl ||
					"/placeholder.png",
			},
			quantity: 1,
			price: product.price,
		};
	}, [product]);

	// Use useEffect to check for the item in the cart.
	useEffect(() => {
		if (cartItems && product) {
			const isProductInCart = cartItems.some(
				(item) => item._id === product.id
			);
			setIsItemInCart(isProductInCart);
		}
	}, [cartItems, product]);

	return (
		<div className="flex">
			{isItemInCart ? (
				<div className="flex justify-center w-96 mt-4">
					<ReUsableButton
						onClick={() => router.push("/cart")}
						bgColor="#3d753b"
						height="3rem"
						width="10rem"
						style={{
							borderRadius: "15px",
							fontStyle: "italic",
							color: "white",
						}}
					>
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
