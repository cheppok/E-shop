"use client";

import Link from "next/link";

export default function CategoryBar() {
	return (
		<div className="w-full text-green-800 p-2 ">
			{/* <h2 className="text-lg font-bold mb-4">Select Categories</h2> */}
			<ul className="space-y-2 flex justify-between">
				<li>
					<Link
						href="/search?category=phone"
						className="hover:underline"
					>
						Phone
					</Link>
				</li>
				<li>
					<Link
						href="/search?category=electronics"
						className="hover:underline"
					>
						Electronics
					</Link>
				</li>
				<li>
					<Link
						href="/search?category=fashion"
						className="hover:underline"
					>
						fashion
					</Link>
				</li>
				<li>
					<Link
						href="/search?category=beauty and personal Care"
						className="hover:underline"
					>
						Beauty and personal Care
					</Link>
				</li>
				<li>
					<Link
						href="/search?category=computer"
						className="hover:underline"
					>
						computer and accessory
					</Link>
				</li>
				<li>
					<Link
						href="/search?category=household"
						className="hover:underline"
					>
						Household items
					</Link>
				</li>
				<li>
					<Link
						href="/search?category=food and drinks"
						className="hover:underline"
					>
						Food & rinks
					</Link>
				</li>
			</ul>
		</div>
	);
}
