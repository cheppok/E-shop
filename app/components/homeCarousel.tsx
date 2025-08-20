import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import Container from "./container";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	// CarouselNext,
	// CarouselPrevious,
} from "@/components/ui/carousel";

const carouselItems = [
	{
		title: "Original beautiful cloth",
		description: "Holiday sales",
		image: "/cloth.png",
	},
	{
		title: "Leather Gucci bag",
		description: "Discount on bulk purchase",
		image: "/bag.png",
	},
	{
		title: "Game pad",
		description: "xmas sale ",
		image: "/gamepad.png",
	},
	{
		title: "perfume",
		description: "long lasting perfume",
		image: "/perfume.png",
	},
	{
		title: "multicolor keyboard",
		description: "",
		image: "/keyboard.png",
	},
];

export function CarouselPlugin() {
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true })
	);

	return (
		<Container>
			<Carousel
				plugins={[plugin.current]}
				className="w-full"
				// onMouseEnter={plugin.current.stop}
				// onMouseLeave={plugin.current.reset}
			>
				<CarouselContent>
					{carouselItems.map((item, index) => (
						<CarouselItem key={index}>
							<div>
								<Card className="w-full  h-96 flex items-center justify-center  ">
									<CardContent className=" flex items-center justify-center  ">
										<div className="m-6">
											<div className="text-4xl text-red-700">
												{item.title}
											</div>
											<div className="text-xl text-green-800 mt-2">
												{item.description}
											</div>
										</div>

										<div className="">
											<Image
												src={item.image}
												height={300}
												width={300}
												alt={item.title}
											/>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious /> */}
				{/* <CarouselNext /> */}
			</Carousel>
		</Container>
	);
}
