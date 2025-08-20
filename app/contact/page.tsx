"use client";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const Contact: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");

	return (
		<div className="  dark:bg-black">
			<div className="h-44 flex justify-center items-center text-2xl font-bold ">
				Our Contact
			</div>
			<main className="flex justify-center space-x-6">
				<section className="contactSection1 flex flex-col border-4 border-slate-50">
					<div className="border-b-2 border-gray-400">
						<div className="flex space-x-4 text-xl pb-4">
							<Image
								src={"/icons8-telephone-96.png"}
								alt=""
								height={30}
								width={30}
								className="bg-red-600 h-10 w-10 rounded-full flex items-center justify-center text-white "
							/>
							<span>Call To Us</span>
						</div>
						<p className="text-sm pb-4">
							We are available 24/7, 7 days a week
						</p>
						<p className="text-sm pb-8">Phone +2348056219922</p>
					</div>
					<div>
						<div className="flex space-x-4 text-xl pt-10">
							<Image
								src={"/icons8-envelope-96.png"}
								alt=""
								height={20}
								width={20}
								className="bg-red-600 h-10 w-10 rounded-full flex items-center justify-center text-white p-1"
							/>
							<span className="text-lg">Write To Us</span>
						</div>
						<p className="text-sm ">
							Fill out our form and we will contact{" "}
						</p>
						<p className="text-sm pb-4">you within 24 hours</p>

						<div className="text-sm pb-4">
							<Link href={""}>
								Emails: cheppok4real@yahoo.com
							</Link>
						</div>
						<div className="text-sm">
							<Link href={""}>
								Emails: cheppok4real@gmail.com
							</Link>
						</div>
					</div>
				</section>

				<section className="contactSection2">
					<form action="#">
						<section className="space-y-8">
							<div className="flex justify-between">
								<div className="relative w-1/3 pr-2">
									<input
										type="text"
										name="name"
										id="name"
										className="bg-gray-100 text-gray-900 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
										placeholder="Your Name"
										required
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
									{!name && (
										<span className="text-red-500 absolute right-36 top-2">
											*
										</span>
									)}
								</div>

								<div className="relative w-1/3 pr-2 pl-2">
									<input
										type="email"
										name="email"
										id="email"
										className="bg-gray-100 text-gray-900 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
										placeholder="Your Email"
										required
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
									{!email && (
										<span className="text-red-500 absolute left-24 top-2">
											*
										</span>
									)}
								</div>

								<div className="relative w-1/3 pl-2">
									<input
										type="number"
										name="number"
										id="phoneNumber"
										placeholder="Phone Number"
										className="bg-gray-100 text-gray-900 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
										required
										value={phoneNumber}
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
									/>
									{!phoneNumber && (
										<span className="text-red-500 absolute right-28 top-2">
											*
										</span>
									)}
								</div>
							</div>

							<div>
								<textarea
									name="message"
									id="contactTextarea"
									placeholder="Your Message"
									className="bg-gray-100 text-gray-900 h-52 w-full p-2.5 rounded-sm  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
								/>
							</div>
						</section>
						<div className="flex justify-end w-full mt-6">
							<button
								type="submit"
								className="bg-red-600 h-14 rounded-md text-white text-center w-48 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
