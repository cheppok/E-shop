"use client";
import React from "react";
import Container from "../container";
import AdminNavItems from "./adminNavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const AdminNav = () => {
	const pathname = usePathname();
	return (
		<div className="w-full shadow-md top-20 pt-4 border-b-[1px]">
			<Container>
				<div className="flex items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
					<Link href={"/admin"} className="flex items-center ">
						<div>
							<Image
								src={"/dashboard-b.png"}
								width={22}
								height={22}
								alt=""
							/>
						</div>
						<AdminNavItems
							label="Summary"
							selected={pathname == "/admin"}
						/>
					</Link>
					<Link
						href={"/admin/add-products"}
						className="flex items-center "
					>
						<div>
							<Image
								src={"/add-product.png"}
								width={22}
								height={22}
								alt=""
							/>
						</div>
						<AdminNavItems
							label="Add Product"
							selected={pathname == "/admin/add-products"}
						/>
					</Link>
					<Link
						href={"/admin/manage-product"}
						className="flex items-center "
					>
						<div>
							<Image
								src={"/manage-b.png"}
								width={24}
								height={24}
								alt=""
							/>
						</div>
						<AdminNavItems
							label="ManageProducts"
							selected={pathname == "/admin/manage-product"}
						/>
					</Link>
					<Link
						href={"/admin/manage-orders"}
						className="flex items-center "
					>
						<div>
							<Image
								src={"/list-bulleted-b.png"}
								width={20}
								height={20}
								alt=""
							/>
						</div>
						<AdminNavItems
							label="ManageOrders"
							selected={pathname == "/admin/manage-orders"}
						/>
					</Link>
				</div>
			</Container>
		</div>
	);
};

export default AdminNav;
