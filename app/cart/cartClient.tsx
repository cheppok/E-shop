"use client";

import React from "react";
import { useCart } from "../hooks/useCart";

import Link from "next/link";

import ReUsableButton from "../components/reusableButton";
import ItemContent from "./itemContent";
import FormatPrice from "../../utils/formatPrice";

const CartClient = () => {
	const { cartItems, handleClearCart, cartTotalAmount } = useCart();

	// if (cartItems || cartItems.length === 0)
	// 	return (
	// 		<div className="flex flex-col items-center">
	// 			<div className="text-2xl"> Your Cart is empty</div>
	// 			<Link
	// 				href={"/"}
	// 				className="text-slate-500 flex items-center gap-1 mt-2"
	// 			>
	// 				Start shopping
	// 			</Link>
	// 		</div>
	// 	);
	return (
		<div>
			<h1 className="flex justify-center text-4xl mb-10">
				Shopping Cart
			</h1>
			<div className="grid grid-cols-5">
				<div className="col-span-2 justify-self-start">Product</div>
				<div className="justify-self-center">Price</div>
				<div className="justify-self-center">Qtty</div>
				<div className="justify-self-end">Total</div>
			</div>
			<div>
				{cartItems &&
					cartItems.map((item) => {
						return <ItemContent key={item.id} item={item} />;
					})}
			</div>
			<div className="flex justify-between border-t-[1.5px] border-slate-200 gap-4 py-4">
				<div>
					<ReUsableButton
						onClick={() => {
							handleClearCart();
						}}
						bgColor="gray"
						width="10rem"
					>
						<div className="text-xl">Clear cart</div>
					</ReUsableButton>
				</div>

				<div className="flex flex-col gap-1 ">
					<div className="flex justify-between w-full font-semibold text-base">
						<span>Subtotal</span>
						<span>{FormatPrice(cartTotalAmount)}</span>
					</div>

					<p className="text-slate-500 text-sm">
						Taxes and Shipping calculate at checkout
					</p>
					<ReUsableButton onAbort={() => {}}>Checkout</ReUsableButton>
					<Link href={"/"}>Contimue Shopping</Link>
				</div>
			</div>
		</div>
	);
};
export default CartClient;
