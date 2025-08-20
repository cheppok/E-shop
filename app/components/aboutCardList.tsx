import React from "react";
import Image from "next/image";
import Link from "next/link";

type AboutCardProps = {
	imageSrc: string;
	title: string;
	price?: string;
	title2?: string;
};

const aboutcategories = [
	{
		imageSrc: "/images/house.png",
		title: "Phones",
		price: "$43.5K",
		title2: "sellers active in our site",
	},
	{
		imageSrc: "/images/dollar-50.png",
		title: "Phones",
		price: "$43",
		title2: "Monthly Products Sale",
	},
	{
		imageSrc: "/images/users.png",
		title: "Phones",
		price: "$43.5K",
		title2: "Customer active in our site",
	},
	{
		imageSrc: "/images/dollarbag.png",
		title: "Phones",
		price: "$436",
		title2: "Annual gross sale in our site",
	},
];

const AboutCategoryCard: React.FC<AboutCardProps> = ({
	imageSrc,
	title,
	price,
	title2,
}) => {
	return (
		<div className="flex flex-col justify-center items-center h-72 w-72 border-2 rounded-md border-gray-200 transition duration-300 ease-in-out hover:bg-red-500 hover">
			<Link
				href={"#"}
				className="flex flex-col justify-center items-center"
			>
				<div className="h-20 w-20 bg-gray-400 flex justify-center items-center rounded-full">
					<Image
						src={imageSrc}
						width={40}
						height={40}
						alt={title}
						className="bg-black rounded-full"
					/>
				</div>

				{/* <h3 className="mt-2 ">{title}</h3> */}
				<h3 className="text-2xl font-semibold mt-6 mb-1">{price}</h3>
				<h3 className="text-sm">{title2}</h3>
			</Link>
		</div>
	);
};

const AboutCardList = () => {
	return (
		<div className="flex space-x-8 pb-16 justify-between mr-32">
			{aboutcategories.map((category, index) => (
				<AboutCategoryCard
					key={index}
					imageSrc={category.imageSrc}
					title={category.title}
					price={category.price}
					title2={category.title2}
				/>
			))}
		</div>
	);
};

export default AboutCardList;
