import React from "react";
import Container from "../container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./cartCount";
import UserMenu from "./userMenu";
import { getCurrentUser } from "@/actions/getCurrent User"; // make sure the path is correct

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export const Navbar = async () => {
	const currentUser = await getCurrentUser();
	console.log(currentUser);

	return (
		<div className="sticky top-0 w-full shadow-sm z-10 bg-slate-200 mb-12">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex justify-between items-center gp-3 md:gap-0">
						<Link
							href="/"
							className="flex justify-between items-center gap-20"
						>
							<p
								className={`${redressed.className} text-3xl font-bold`}
							>
								E-shop
							</p>
							<p>Home</p>
						</Link>

						<div className="hidden md:block">search</div>

						<div className="flex items-center gap-8 md:gap-12">
							{!currentUser && (
								<div>
									<Link href="/sign-in">Login</Link>
								</div>
							)}

							<div>
								<CartCount />
							</div>

							<div>
								<UserMenu currentUser={currentUser} />
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};
