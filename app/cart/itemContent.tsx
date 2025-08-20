"use client";

import React from "react";
import { cartProductType } from "../types/types";
import FormatPrice from "../../utils/formatPrice";
import Link from "next/link";
import { TruncateText } from "../../utils/truncateText";
import Image from "next/image";
import { SetQuantity } from "../components/setQuantity";
// import { useState } from "react";
import { useCart } from "../hooks/useCart";

interface itemContentProps {
	item: cartProductType;
}

const ItemContent: React.FC<itemContentProps> = ({ item }) => {
	const { handleRemoveItemFromCart } = useCart();
	const { handleQtyIncrease } = useCart();
	const { handleQtyDecrease } = useCart();

	return (
		<div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-500 py-4 items-center">
			<div className="col-span-2  ">
				<div className="flex gap-40 p-4">
					<Link href={`/product/${item._id}`}>
						<Image
							src={item.imageUrl || "/placeholder.png"}
							alt={item.name}
							width={100}
							height={100}
							className="object-contain"
						/>
					</Link>

					<div className="flex flex-col gap-1 p-2 ">
						<div>{TruncateText(item.name)}</div>
						<div>{item.color}</div>
						<div>
							<button
								className="underline text-red-500 cursor-pointer "
								onClick={() => handleRemoveItemFromCart(item)}
							>
								Remove
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="justify-self-center">{FormatPrice(item.price)}</div>
			<div className="justify-self-center">
				<div className="flex justify-center items-center">
					<SetQuantity
						// cartProduct={itemInCart}
						cartProduct={item}
						handleQtyDecrease={() => {
							handleQtyDecrease(item);
						}}
						handleQtyIncrease={() => {
							handleQtyIncrease(item);
						}}
					/>
				</div>{" "}
			</div>
			<div className="justify-self-end font-semibold">
				{FormatPrice(item.price * item.quantity)}
			</div>
		</div>
	);
};

export default ItemContent;
