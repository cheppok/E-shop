export const dynamic = "force-dynamic";

import React from "react";

import Link from "next/link";
import Image from "next/image";

export default function About() {
	return (
		<div className=" pl-32 dark:bg-black">
			<section className="flex mt-12">
				<div className="flex flex-col justify-center items-center mr-8 pr-8">
					<h1 className="text-5xl font-semibold tracking-wider mb-10">
						Our Story
					</h1>
					<p className="mb-4">
						Lounched in 2024. Cheppok is a premier online shopping
						market place with an active presence in Nigeria, Ghana
						and South-Africa. cheppok has over 20,000 sellers and
						more than 3000 brands to meet you daily shopping need.
					</p>
					<p>
						Cheppok Eshop has over a million products to offer.
						Growing at a very fast rate, cheppok constantly updates
						its products with the newest and trending items to meet
						todays shopper&#39;s trend.
					</p>
				</div>
				<div>
					<Image
						src={"/about-image.png"}
						height={100}
						width={1400}
						alt="image"
					/>
				</div>
			</section>
			<div className="text-4xl p-2 rounded-lg bg-amber-100 w-fit mt-16">
				Our Team
			</div>
			<section className="flex justify-between mr-32 mt-8 ">
				<div className=" rounded-sm">
					<Image
						src={"/member.jpg"}
						height={350}
						width={350}
						alt=""
					/>
					<h2 className="text-2xl font-bold tracking-wider mb-1">
						Okwechime Peter
					</h2>
					<h5>Founder $ Chairman</h5>
				</div>
				<div className=" rounded-sm">
					<Image
						src={"/ozioma.jpg"}
						height={350}
						width={350}
						alt=""
					/>
					<h2 className="text-2xl font-bold tracking-wider mb-1">
						{" "}
						Okwechime Ozioma
					</h2>
					<h5>Managing Director</h5>
				</div>
				<div className=" rounded-sm">
					<Image
						src={"/member-2.png"}
						height={350}
						width={350}
						alt=""
					/>
					<h2 className="text-2xl font-bold tracking-wider mb-1">
						Will Smith
					</h2>
					<h5>Product Designer</h5>
				</div>
			</section>

			<section className="flex justify-around mt-28 mr-32">
				<div className="flex flex-col justify-center items-center">
					<div className="h-16 w-16 bg-gray-400 flex justify-center items-center rounded-full">
						<Image
							src={"/delivery-truck.png"}
							width={35}
							height={35}
							alt=""
							className="bg-black rounded-full"
						/>
					</div>
					<h3 className="text-2xl font-semibold mt-4">
						Free and Fast Delivery
					</h3>
					<h3 className="text-sm">
						Free delivery for all orders over $140
					</h3>
				</div>
				<Link
					href={"/contact"}
					className="flex flex-col justify-center items-center"
				>
					<div className="h-16 w-16 bg-gray-400 flex justify-center items-center rounded-full">
						<svg
							className="w-8 h-8 text-gray-50 dark:text-white bg-black rounded-full"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<h3 className="text-2xl font-semibold mt-4">
						24/7 Customer Service
					</h3>
					<h3 className="text-sm">Friendly 24/7 customer support</h3>
				</Link>
				<div className="flex flex-col justify-center items-center">
					<div className="h-16 w-16 bg-gray-400 flex justify-center items-center rounded-full">
						<Image
							src={"/guarantee.png"}
							width={35}
							height={30}
							alt=""
							className="bg-black rounded-full"
						/>
					</div>
					<h3 className="text-2xl font-semibold mt-4">
						Money Back Guarantee
					</h3>
					<h3 className="text-sm">
						We return money back within 30 days
					</h3>
				</div>
			</section>
		</div>
	);
}
