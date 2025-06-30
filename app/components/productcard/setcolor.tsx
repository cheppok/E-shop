"use client";
import React from "react";
// import Image from "next/image";
import {
	SelectedimgType,
	cartProductType,
} from "../../product/[productid]/proDetailsPage";

interface SetColorProps {
	image: SelectedimgType[];
	cartProduct: cartProductType;
	handleColorSelect: (value: SelectedimgType) => void;
}

export const SetColor: React.FC<SetColorProps> = ({
	image,
	cartProduct,
	handleColorSelect,
}) => {
	return (
		<div>
			<div>
				<span>Color</span>
				<div className=" flex gap-1">
					{image.map((Image) => {
						return (
							<div
								key={Image.color}
								onClick={() => handleColorSelect(Image)}
								className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${
									cartProduct.selectedimg.color ===
									Image.color
										? "border[1.5px]"
										: "border-none"
								}`}
							>
								<div
									style={{ background: Image.colorCode }}
									className="h-5 w-5 rounded-full border-[1.5px] border-slate-300 cursor-pointer"
								></div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
