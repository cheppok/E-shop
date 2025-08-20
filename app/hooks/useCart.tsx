"use client";

import {
	createContext,
	useState,
	useContext,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import { cartProductType } from "../types/types";
import ReUsableButton from "../components/reusableButton";

type cartContextType = {
	cartTotalQty: number;
	cartTotalAmount: number;
	cartItems: cartProductType[] | null;
	handleAddItemsToCart: (product: cartProductType) => void;
	handleRemoveItemFromCart: (product: cartProductType) => void;
	handleQtyIncrease: (product: cartProductType) => void;
	handleQtyDecrease: (product: cartProductType) => void;
	handleClearCart: () => void;
};

interface itemContentProps {
	product: cartProductType;
}

export const CartContext = createContext<cartContextType | null>(null);

interface ProviderProps {
	children: React.ReactNode;
}

export const CartcContextProvider: React.FC<ProviderProps> = ({ children }) => {
	const [cartTotalQty, setCartTotalQty] = useState(0);
	const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);

	const [cartItems, setCartItems] = useState<cartProductType[] | null>([]);
	useEffect(() => {
		const cartItems: any = localStorage.getItem("eShopItems");
		const cProduct: cartProductType[] | null = JSON.parse(cartItems);
		setCartItems(cProduct);
	}, []);

	useEffect(() => {
		const getSubTotals = () => {
			if (cartItems) {
				const { total, qty } = cartItems?.reduce(
					(acc, item) => {
						const itemTotal = item.price * item.quantity;
						acc.total += itemTotal;
						acc.qty += item.quantity;
						return acc;
					},
					{ total: 0, qty: 0 }
				);
				setCartTotalQty(qty);
				setCartTotalAmount(total);
			}
		};
		getSubTotals();
	}, [cartItems]);

	const handleAddItemsToCart = useCallback((product: cartProductType) => {
		const productWithSafeImage: cartProductType = {
			...product,
			cartItemId: crypto.randomUUID(), // unique cart entry id
			imageUrl: product.imageUrl ?? "/placeholder.png", // ✅ always string
		};

		setCartItems((prev) => {
			const updatedCart = [...(prev || []), productWithSafeImage];
			localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
			return updatedCart;
		});
	}, []);

	const ProductCartItemToCart: React.FC<itemContentProps> = ({ product }) => {
		// const { handleAddItemsToCart, cartItems } = useCart();

		const cartProduct = useMemo<cartProductType>(() => {
			return {
				_id: product._id, // This needs to be a unique ID
				name: product.name,
				description: product.description,
				price: product.price,
				quantity: product.quantity,
				imageUrl: product.imageUrl,
				cartItemId: product.cartItemId,
				category: product.category,
				// ...other product properties
			};
		}, [product]); // This is the dependency array that ensures cartProduct is re-created when 'product' changes

		return (
			// ...
			<ReUsableButton
				onClick={() => handleAddItemsToCart(cartProduct)}
				// ...
			>
				ADD ITEM CART
			</ReUsableButton>
			// ...
		);
	};

	// export default ProductCartItemToCart;
	const handleRemoveItemFromCart = useCallback(
		(product: cartProductType) => {
			if (cartItems) {
				const filteredItems = cartItems.filter((item) => {
					return item.cartItemId !== product.cartItemId;
				});
				setCartItems(filteredItems);
				localStorage.setItem(
					"eShopItems",
					JSON.stringify(filteredItems)
				);
			}
		},
		[cartItems]
	);
	const handleQtyIncrease = useCallback(
		(product: cartProductType) => {
			if (product.quantity === 25) return;

			if (cartItems) {
				const updatedCart = [...cartItems];
				const existingIndex = cartItems.findIndex(
					(item) => item.cartItemId === product.cartItemId
				);

				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity += 1;
				}

				setCartItems(updatedCart);
				localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
			}
		},
		[cartItems]
	);

	const handleQtyDecrease = useCallback(
		(product: cartProductType) => {
			if (product.quantity === 1) return;

			if (cartItems) {
				const updatedCart = [...cartItems];
				const existingIndex = cartItems.findIndex(
					(item) => item.cartItemId === product.cartItemId
				);

				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity -= 1;
				}

				setCartItems(updatedCart);
				localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
			}
		},
		[cartItems]
	);

	const handleClearCart = useCallback(() => {
		setCartItems(null);
		setCartTotalAmount(0);
		setCartTotalQty(0);
		localStorage.setItem("eShopItems", JSON.stringify(null));
	}, []);

	const value = {
		cartTotalQty,
		cartTotalAmount,
		cartItems,
		handleAddItemsToCart,
		ProductCartItemToCart,
		handleRemoveItemFromCart,
		handleQtyIncrease,
		handleQtyDecrease,
		handleClearCart,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};

export const useCart = () => {
	const Context = useContext(CartContext);
	if (Context === null) {
		throw new Error("useCart must be used within a contextProvider");
	}
	return Context;
};
