export const dynamic = "force-dynamic";
import React from "react";
import Container from "../container";
import { FooterList } from "./footerList";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
	return (
		<div className="bg-slate-700 text-slate-200 relative bottom-0 pt-6 mt-20 ">
			<Container>
				<div className=" flex justify-between">
					<FooterList>
						<h3 className="font-bold text-xl">Categories</h3>
						<Link href="/search?category=electronics">
							Electronics
						</Link>
						<Link href="/search?category=fashion">Fashion</Link>
						<Link href="/search?category=computer">Computer</Link>
						<Link href="/search?category=phone">Phone</Link>
						<Link href="/search?category=beauty and personal care">
							Beauty
						</Link>
					</FooterList>
					<FooterList>
						<h3 className="font-bold text-xl">Customer services</h3>
						<Link href={"/contact"}>Contact us</Link>
						<Link href={"/refund"}>Refund & Exchanges</Link>
						<Link href={"/shippingPolicy"}>Shipping Policy</Link>
						<Link href={"/faqs"}>FAQS</Link>
					</FooterList>
					<div className="w-full md:w-1/3 pb-6 md:mb-0">
						<h3 className="font-bold text-xl pb-2">Description</h3>
						<p>
							E-shop has over a million products to offer. Growing
							at a very fast rate, cheppok constantly updates its
							products with the newest and trending items to meet
							todays shopper&#39;s trend.
						</p>
						<p className="text-sm italic pl-6 pt-2">
							&copy;{new Date().getFullYear()} E-shop. All right
							reserved
						</p>
					</div>

					<FooterList>
						<h3 className="font-bold text-xl">Follow Us</h3>
						<div className="flex gap-2">
							<div>
								<a
									href="https://www.facebook.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/facebook-white.png"
										height={24}
										width={24}
										alt="Facebook icon"
									/>
								</a>
							</div>

							<div>
								<a
									href="https://x.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/twitter-white.png"
										height={24}
										width={24}
										alt="Twitter icon"
									/>
								</a>
							</div>
							<div>
								<a
									href="https://youtube.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/youtube-white.png"
										height={24}
										width={24}
										alt="Twitter icon"
									/>
								</a>
							</div>
							<div>
								<a
									href="https://instagram.com/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image
										src="/instagram-white.png"
										height={24}
										width={24}
										alt="Twitter icon"
									/>
								</a>
							</div>
						</div>
					</FooterList>
				</div>
			</Container>
		</div>
	);
};
