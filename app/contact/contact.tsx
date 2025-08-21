"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Contact: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !email || !phoneNumber) {
			alert("Please fill all required fields.");
			return;
		}
		console.log({ name, email, phoneNumber });
	};

	return (
		<div className="dark:bg-black">
			<div className="h-44 flex justify-center items-center text-2xl font-bold">
				Our Contact
			</div>

			<main className="flex flex-col md:flex-row justify-center gap-6 px-4">
				{/* Left Section */}
				<section className="flex flex-col border-4 border-slate-50 p-6 rounded-lg">
					<div className="border-b-2 border-gray-400 pb-6">
						<div className="flex space-x-4 text-xl pb-4">
							<Image
								src="/icons8-telephone-96.png"
								alt="Call Icon"
								height={30}
								width={30}
								className="bg-red-600 h-10 w-10 rounded-full"
							/>
							<span>Call To Us</span>
						</div>
						<p className="text-sm">
							We are available 24/7, 7 days a week
						</p>
						<p className="text-sm">Phone: +2348056219922</p>
					</div>

					<div className="pt-6">
						<div className="flex space-x-4 text-xl">
							<Image
								src="/icons8-envelope-96.png"
								alt="Mail Icon"
								height={20}
								width={20}
								className="bg-red-600 h-10 w-10 rounded-full p-1"
							/>
							<span className="text-lg">Write To Us</span>
						</div>
						<p className="text-sm">
							Fill out our form and we will contact you within 24
							hours
						</p>
						<p className="text-sm">
							<Link href="mailto:cheppok4real@yahoo.com">
								cheppok4real@yahoo.com
							</Link>
						</p>
						<p className="text-sm">
							<Link href="mailto:cheppok4real@gmail.com">
								cheppok4real@gmail.com
							</Link>
						</p>
					</div>
				</section>

				{/* Right Section */}
				<section className="flex-1 border p-6 rounded-lg">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<input
								type="text"
								id="name"
								placeholder="Your Name"
								className="bg-gray-100 p-2.5 w-full dark:bg-gray-700 dark:text-white"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								type="email"
								id="email"
								placeholder="Your Email"
								className="bg-gray-100 p-2.5 w-full dark:bg-gray-700 dark:text-white"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="tel"
								id="phoneNumber"
								placeholder="Phone Number"
								className="bg-gray-100 p-2.5 w-full dark:bg-gray-700 dark:text-white"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>

						<textarea
							id="message"
							placeholder="Your Message"
							className="bg-gray-100 h-52 w-full p-2.5 rounded-sm dark:bg-gray-700 dark:text-white"
						/>

						<div className="flex justify-end">
							<button
								type="submit"
								className="bg-red-600 h-14 rounded-md text-white w-48 hover:bg-red-700"
							>
								Send Message
							</button>
						</div>
					</form>
				</section>
			</main>
		</div>
	);
};

export default Contact;
