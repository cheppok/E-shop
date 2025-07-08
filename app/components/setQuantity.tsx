import React from "react";
import { cartProductType } from "../types";

interface setQtyProps {
	cartProduct: cartProductType;
	handleQtyIncrease: () => void;
	handleQtyDecrease: () => void;
}

export const SetQuantity: React.FC<setQtyProps> = ({
	cartProduct,
	handleQtyIncrease,
	handleQtyDecrease,
}) => {
	return (
		<div>
			<div className="flex gap-6 items-center">
				<button
					className="border-2 border-red-300  rounded-full h-8 w-7 cursor-pointer"
					onClick={handleQtyDecrease}
					disabled={cartProduct.quantity <= 1}
				>
					-
				</button>
				<div>{cartProduct.quantity}</div>
				<button
					className="border-2 border-green-300  rounded-full  h-8 w-7 cursor-pointer"
					onClick={handleQtyIncrease}
					disabled={cartProduct.quantity >= 25}
				>
					+
				</button>
			</div>
		</div>
	);
};
