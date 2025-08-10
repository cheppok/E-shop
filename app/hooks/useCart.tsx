"use client";

import {
	createContext,
	useState,
	useContext,
	useCallback,
	useEffect,
} from "react";
import { cartProductType } from "../types/types";

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

export const CartContext = createContext<cartContextType | null>(null);
// export const CartContext = createContext<cartContextType>(
// 	{} as cartContextType
// );

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
		setCartItems((prev) => {
			const updatedCart = prev ? [...prev, product] : [product];

			localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
			return updatedCart;
		});
	}, []);

	const handleRemoveItemFromCart = useCallback(
		(product: cartProductType) => {
			if (cartItems) {
				const filteredItems = cartItems.filter((item) => {
					return item.id !== product.id;
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
			if (product.quantity === 25) {
				return;
			}
			if (cartItems) {
				const updatedCart = [...cartItems];

				const existingIndex = cartItems.findIndex(
					(item) => item.id == product.id
				);

				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity = ++updatedCart[
						existingIndex
					].quantity;
				}
				setCartItems(updatedCart);
				localStorage.setItem("eShopItems", JSON.stringify(updatedCart));
			}
		},

		[cartItems]
	);

	const handleQtyDecrease = useCallback(
		(product: cartProductType) => {
			if (product.quantity === 1) {
				return;
			}
			if (cartItems) {
				const updatedCart = [...cartItems];
				const existingIndex = cartItems.findIndex(
					(item) => item.id == product.id
				);
				if (existingIndex > -1) {
					updatedCart[existingIndex].quantity = --updatedCart[
						existingIndex
					].quantity;
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
