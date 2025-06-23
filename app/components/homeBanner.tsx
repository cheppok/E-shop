import React from "react";
import Image from "next/image";
import Container from "./container";

export const HomeBanner = () => {
	return (
		<Container>
			<div className="flex justify-around bg-gradient-to-r from-sky-500 to-sky-700 mb-12">
				<div className="flex flex-col justify-center">
					<h1 className="text-5xl font-bold p-2">Summer Sales</h1>
					<p className="xl p-1">Enjoy Discount on selected items</p>
					<p className="text-5xl p-1 text-yellow-500 font-bold flash-text">
						GET 50% OFF
					</p>
				</div>
				<div>
					<Image
						src={"/banner-image.png"}
						height={500}
						width={500}
						alt="banner image"
					/>
				</div>
			</div>
		</Container>
	);
};
