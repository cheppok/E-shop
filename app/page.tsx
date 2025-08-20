"use client";

import { HomeBanner } from "./components/homeBanner";
import Container from "./components/container";
import { ProductCard } from "./components/productcard/productCard";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/productContext";
import { CarouselPlugin } from "./components/homeCarousel";
import ScrollHeader from "./components/scrollHeader";
import Image from "next/image";
import ReUsableButton from "./components/reusableButton";
import SectionHeading from "./components/sectionHeading";
import SectionTitle from "./components/sectionTitle";
import CardLabel from "./components/cardLabel";
import CardLabel2 from "./components/cardLabel2";
import { productType } from "./types/types";
import CategoryBar from "./components/CategoryBar/categoryBar";
import Link from "next/link";

export default function Home() {
	const { products, setProducts } = useContext(ProductsContext);
	const [loading, setLoading] = useState(true);

	// Fetch products when Home mounts
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch("/api/products", { cache: "no-store" });
				if (res.ok) {
					const data = await res.json();
					const items = Array.isArray(data)
						? data
						: data.products || [];
					setProducts(items);
				}
			} catch (error) {
				console.error("Error fetching products", error);
			} finally {
				setLoading(false); // ✅ mark loading as complete
			}
		};
		fetchProducts();
	}, [setProducts]);

	return (
		<>
			<ScrollHeader />
			<Container>
				<div>
					<div>
						<CategoryBar />
						<CarouselPlugin />
					</div>
					<SectionTitle name="Our Products" />
					<SectionHeading title="Explore Our Products " />
					<div className="max-w-[1920px] mx-auto px-4 mt-12 md:px-2 xl:px-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
						{loading ? (
							<p>Loading products...</p> // 🔹 temporary loading UI
						) : products.length > 0 ? (
							products.map((product: productType) => (
								<div key={product._id}>
									<ProductCard data={product} />
								</div>
							))
						) : (
							<p>No products found</p> // ✅ only shows if finished loading & empty
						)}
					</div>
					<SectionTitle name="This Month" />
					<SectionHeading title="Best Selling Products" />
					<section className="flex  justify-between mt-5 bg-black mr-32 ml-32 p-16 h-[500px] relative">
						<div className="text-white">
							{/* <p className="text-green-500 text-sm font-semibold tracking-wide">
								Categories
							</p> */}
							<p className="text-5xl font-semibold pt-10 tracking-wide">
								Enhance Your{" "}
							</p>
							<p className="text-5xl font-semibold pt-3 tracking-wider">
								Music Experience
							</p>
							<div className="flex text-black space-x-6 pt-10">
								<div className="bg-gray-100 rounded-full h-16 w-16 flex flex-col items-center justify-center font-semibold">
									<h2>23</h2>
									<p className="text-xs">Hours</p>
								</div>
								<div className="bg-gray-100 rounded-full h-16 w-16 flex flex-col items-center justify-center font-semibold">
									<h2>05</h2>
									<p className="text-xs">Days</p>
								</div>
								<div className="bg-gray-100 rounded-full h-16 w-16 flex flex-col items-center justify-center font-semibold">
									<h2>55</h2>
									<p className="text-xs">Minutes</p>
								</div>
								<div className="bg-gray-100 rounded-full h-16 w-16 flex flex-col items-center justify-center font-semibold">
									<h2>35</h2>
									<p className="text-xs">Seconds</p>
								</div>
							</div>
							<div className="absolute bottom-16">
								<ReUsableButton
									bgColor="green"
									width="10rem"
									height="3.5rem"
								>
									Search for Boombox
								</ReUsableButton>
							</div>
						</div>
						<div className="flex items-center">
							<Image
								src={"/boombox.png"}
								height={600}
								width={600}
								alt="boombox"
							/>
						</div>
					</section>
					<SectionTitle name=" Today&#39;s" />
					<SectionHeading title=" Flash Sales" />
					<div>
						<HomeBanner />
					</div>
					<SectionTitle name="Featured" />
					<SectionHeading title="New Arrival" />
					<section className="flex ml-32 mr-32 mt-12 justify-between ">
						<div className=" h-[600px] w-[650px] bg-black rounded-sm relative  ">
							<Image
								src={"/p5-playstation.png"}
								height={500}
								width={500}
								alt=""
								className="mt-[100px]"
							/>

							<Link href="/search?category=electronics">
								<CardLabel
									name="Play Station 5"
									description="Black and white version of PS5"
									moreDescription="Coming soon"
									shopNow="SHOP NOW"
								/>
							</Link>
						</div>

						<div>
							<div className="flex flex-col h-[600px] w-[650px] space-y-8 ml-8">
								<div className="bg-black h-72 w-full rounded-sm flex justify-end relative">
									<Image
										src={"/woman-cap.png"}
										height={450}
										width={450}
										alt=""
									/>
									<Link href="/search?category=fashion">
										<CardLabel
											name="Women's Collection"
											description="Featured woman collection that"
											moreDescription="give you another vibe"
											shopNow="SHOP NOW"
										/>
									</Link>
								</div>
								<div className="flex space-x-8 h-72 w-full">
									<div className="bg-black w-80 rounded-sm flex justify-center items-center relative">
										<Image
											src={"/speaker.png"}
											height={200}
											width={200}
											alt=""
										/>
										<Link
											href={
												"/search?category=electronics"
											}
										>
											<CardLabel2
												name="Speakers"
												description="Amason wireless speakers"
												shopNow="SHOP NOW"
											/>
										</Link>
									</div>
									<div className="bg-black w-80 rounded-sm flex justify-center items-center relative ">
										<Image
											src={"/perfume.png"}
											height={200}
											width={200}
											alt=""
										/>
										<Link
											href={
												"/search?category=beauty and personal care"
											}
										>
											<CardLabel2
												name="Gucci perfume"
												description="Long lasting"
												shopNow="SHOP NOW"
											/>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</Container>
		</>
	);
}
