import React from "react";
import Container from "../container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./cartCount";
import UserMenu from "./userMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export const Navbar = async () => {
	const currentUser = await getCurrentUser();

	return (
		<div className="sticky top-0 w-full shadow-sm z-10 bg-slate-200 text-blue-900 ">
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className="flex justify-between items-center md:gap-0">
						<div className="flex justify-between items-center gap-12">
							<Link
								href="/"
								className="flex justify-between items-center"
							>
								<p
									className={`${redressed.className} text-3xl font-bold`}
								>
									Cheppok
								</p>
							</Link>
							<div className="flex gap-2 hover:scale-95 text-center hover:text-gray-900">
								<Link href={"/"}>
									<p>Home</p>
								</Link>
								<Link
									href={"/about"}
									className="hover:scale-95 text-center hover:text-gray-900"
								>
									<p>About</p>
								</Link>
								<Link
									href={"/contact"}
									className="hover:scale-95 text-center hover:text-gray-900"
								>
									<p>Contact Us</p>
								</Link>
							</div>
						</div>

						<Link
							href={"/search"}
							className="hidden md:block hover:scale-95 text-center hover:text-gray-900"
						>
							Search products
						</Link>

						<div className="flex items-center gap-8 md:gap-12 hover:scale-95 text-center hover:text-gray-900">
							{currentUser ? (
								<Link href="/admin">Admin Dashboard</Link>
							) : (
								<div className="flex">
									<Link
										href="/sign-in"
										className="hover:scale-105 text-center hover:text-gray-900"
									>
										Login/
									</Link>
									<Link
										href="/register"
										className="hover:scale-105 text-center hover:text-gray-900"
									>
										SignUp
									</Link>
								</div>
							)}

							<CartCount />

							<UserMenu currentUser={currentUser} />
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
};
