import React from "react";
import Container from "../container";
import { FooterList } from "./footerList";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
	return (
		<div className="bg-slate-700 text-slate-200 relative bottom-0 pt-6 mt-12 ">
			<Container>
				<div className=" flex justify-between">
					<FooterList>
						<h3 className="font-bold text-xl">Categories</h3>
						<Link href={"/"}>Electronics</Link>
						<Link href={"/"}>Fashion</Link>
						<Link href={"/"}>Drinks</Link>
						<Link href={"/"}>Households</Link>
						<Link href={"/"}>electronics</Link>
					</FooterList>
					<FooterList>
						<h3 className="font-bold text-xl">Customer services</h3>
						<Link href={"/"}>Contact us</Link>
						<Link href={"/"}>Refund & Exchanges</Link>
						<Link href={"/"}>Shipping Policy</Link>
						<Link href={"/"}>FAQs</Link>
					</FooterList>
					<div className="w-full md:w-1/3 pb-6 md:mb-0">
						<h3 className="font-bold text-xl pb-2">Description</h3>
						<p>
							REPORT OF THE INCIDENT INVOLVING STATION AMBULANCE.
							Following the gross shortage of pump operators and
							drivers in the station, as a operation officer/
							training officer, it becomes my responsibility to
							make sure that fire operational readiness is not
							affected due to lack of persons to drive all our
							fire vehicles during emergency. Hence occasionally,
							an evaluation is done on personnel to adequately
							allocate them to the right vehicle
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
