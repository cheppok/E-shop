"use client";

import React from "react";
import Link from "next/link";

export default function ScrollHeader() {
	return (
		<div className="bg-black text-white text-lg w-full h-14 flex items-center relative overflow-hidden">
			{/* Scrolling text */}
			<div className="flex whitespace-nowrap animate-marquee">
				<span className="px-8">
					Summer Sales For All Swim Suit And Free Express Delivery -
					OFF 50%!
					<Link
						href="/"
						className="underline pl-3"
						aria-label="Shop now for summer sales"
					>
						Shop Now
					</Link>
				</span>
				<span className="px-8">
					Summer Sales For All Swim Suit And Free Express Delivery -
					OFF 50%!
					<Link
						href="/search"
						className="underline pl-3 "
						aria-label="Shop now for summer sales"
					>
						Shop Now
					</Link>
				</span>
			</div>

			{/* Static welcome message on the right */}
			<div className="absolute right-4 font-thin text-2xl flash-text">
				You are welcome
			</div>
		</div>
	);
}
