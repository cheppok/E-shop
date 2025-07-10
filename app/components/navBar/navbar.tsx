import React from "react";
import Container from "../container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./cartCount";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export const Navbar = () => {
	return (
		<div className="sticky top-0 w-full shadow-sm z-10 bg-slate-200 mb-12 ">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex justify-between items-center gp-3 md:gap-0">
						<Link
							href={"/"}
							className={`${redressed.className} text-3xl font-bold`}
						>
							E-shop
						</Link>
						<div className="hidden md:block">search</div>
						<div className="flex items-center gap-8 md:gap-12">
							<div>
								<Link href={"/login"}>Login</Link>
							</div>
							<div>
								<CartCount />
							</div>
							<div>user</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};
