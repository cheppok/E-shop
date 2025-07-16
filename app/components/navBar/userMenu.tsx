// "use client";

// import React from "react";
// import { useCallback, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import MenuItem from "./menuItem";
// import { signOut } from "next-auth/react";
// import Backdrop from "./backdrop";

// const UserMenu = () => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const toggleOpen = useCallback(() => {
// 		setIsOpen((prev) => !prev);
// 	}, []);
// 	return (
// 		<>
// 			{" "}
// 			<div className=" relative z-30">
// 				<div
// 					onClick={toggleOpen}
// 					className=" flex gap-1 p-2 border-1 rounded-full border-slate-500 cursor-pointer hover:shadow-md transition"
// 				>
// 					<Image
// 						src={"/user-white1.png"}
// 						width={32}
// 						height={32}
// 						alt=""
// 						className="bg-black p-1 rounded-full"
// 					/>
// 					<Image
// 						src={"/arrow-down.png"}
// 						width={12}
// 						height={12}
// 						alt=""
// 					/>
// 				</div>
// 				{isOpen && (
// 					<div className="absolute right-0 top-12 w-[170px] text-sm fex flex-col shadow-md rounded-md bg-white overflow-hidden">
// 						<div>
// 							<Link href={"/orders"}>
// 								<MenuItem onClick={toggleOpen}>
// 									your orders
// 								</MenuItem>
// 							</Link>
// 							<Link href={"/admin"}>
// 								<MenuItem onClick={toggleOpen}>
// 									Admin Dashboard
// 								</MenuItem>
// 							</Link>

// 							<MenuItem
// 								onClick={() => {
// 									toggleOpen();
// 									signOut();
// 								}}
// 							>
// 								Logout
// 							</MenuItem>
// 						</div>
// 						<div>
// 							<Link href={"/sign-in"}>
// 								<MenuItem onClick={toggleOpen}>Login</MenuItem>
// 							</Link>
// 							<Link href={"/register"}>
// 								<MenuItem onClick={toggleOpen}>
// 									register
// 								</MenuItem>
// 							</Link>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 			{isOpen ? <Backdrop onClick={toggleOpen} /> : null}
// 		</>
// 	);
// };

// export default UserMenu;

"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MenuItem from "./menuItem";
import { signOut } from "next-auth/react";
import Backdrop from "./backdrop";
import { SafeUser } from "../../../app/types";
import { useRouter } from "next/navigation";

interface UserMenuProps {
	currentUser: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const toggleOpen = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);
	console.log("Image src:", currentUser?.image);

	return (
		<>
			<div className=" relative z-30">
				<div
					onClick={toggleOpen}
					className=" flex gap-1 p-2 border-1 rounded-full border-slate-500 cursor-pointer hover:shadow-md transition"
				>
					<Image
						src={
							typeof currentUser?.image === "string" &&
							currentUser.image.trim()
								? currentUser.image.trim()
								: "/user-white1.png"
						}
						width={32}
						height={32}
						alt="User icon"
						className="bg-black p-1 rounded-full"
					/>
					<Image
						src={"/arrow-down.png"}
						width={12}
						height={12}
						alt="Arrow down"
					/>
				</div>

				{isOpen && (
					<div className="absolute right-0 top-12 w-[170px] text-sm flex flex-col shadow-md rounded-md bg-white overflow-hidden">
						{currentUser ? (
							<>
								<div className="self-center-safe text-lg font-semibold italic">
									{currentUser.name}
								</div>
								<Link href={"/orders"}>
									<MenuItem onClick={toggleOpen}>
										Your Orders
									</MenuItem>
								</Link>
								<Link href={"/admin"}>
									<MenuItem onClick={toggleOpen}>
										Admin Dashboard
									</MenuItem>
								</Link>

								<MenuItem
									onClick={async () => {
										toggleOpen();
										await signOut({ redirect: false }); // prevent full page redirect
										router.push("/");
										router.refresh(); // ✅ re-fetch server props / session
									}}
								>
									Logout
								</MenuItem>
							</>
						) : (
							<>
								<Link href={"/sign-in"}>
									<MenuItem onClick={toggleOpen}>
										Login
									</MenuItem>
								</Link>
								<Link href={"/register"}>
									<MenuItem onClick={toggleOpen}>
										Register
									</MenuItem>
								</Link>
							</>
						)}
					</div>
				)}
			</div>
			{isOpen && <Backdrop onClick={toggleOpen} />}
		</>
	);
};

export default UserMenu;
