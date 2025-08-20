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
							<div className="flex gap-2">
								<Link
									href={"/"}
									className=" text-center hover:border-slate-300 hover:border-b-2"
								>
									<p>Home</p>
								</Link>
								<Link
									href={"/about"}
									className=" text-center hover:border-slate-300 hover:border-b-2 "
								>
									<p>About</p>
								</Link>
								<Link
									href={"/contact"}
									className=" text-center hover:border-slate-300 hover:border-b-2 "
								>
									<p>Contact </p>
								</Link>
							</div>
						</div>

						<Link
							href={"/search"}
							className="hidden md:block  text-center hover:border-slate-300 hover:border-b-2"
						>
							Search products
						</Link>

						<div className="flex items-center gap-8 md:gap-12  text-center">
							{currentUser ? (
								<Link
									href="/admin"
									className="text-center hover:border-slate-300 hover:border-b-2 border-slate-300"
								>
									Admin Dashboard
								</Link>
							) : (
								<div className="flex">
									<Link
										href="/sign-in"
										className=" text-center hover:border-slate-300 hover:border-b-2 border-slate-300"
									>
										Login/
									</Link>
									<Link
										href="/register"
										className=" text-center hover:border-slate-300 hover:border-b-2 border-slate-300"
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
