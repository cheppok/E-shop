import React from "react";
import Link from "next/link";

type TitleProps = {
	name: string;
	bgClass?: string; // Optional prop for background image class
	height?: string; // Optional prop for height
	width?: string; // Optional prop for width
	oldPrice?: string;
	newPrice?: string;
	rating?: string;
	style?: React.CSSProperties; // Add this line
	currentPrice?: string;
	showNewButton?: boolean;
};

export default function Card({
	name,
	oldPrice,
	newPrice,
	currentPrice,
	rating,
	showNewButton,
	bgClass = "bg-red-600",
	height = "h-14",
	width = "w-48",
	style,
}: TitleProps) {
	return (
		<div className="rounded-lg dark:bg-gray-800 dark:border-gray-700 relative">
			<Link href="#">
				<div
					className={`${bgClass} ${height} ${width} flex justify-center h-[250px] w-[270px] pt-4 bg-gray-200`}
					style={style}
				></div>
			</Link>

			<div className="flex items-center justify-between relative">
				<Link
					href="#"
					className="w-[270px] text-white bg-black absolute bottom-0 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-b-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Add to cart
				</Link>
			</div>
			<div className="mt-2 pb-5">
				<Link href="#">
					<h3 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
						{name}
					</h3>
				</Link>
				<span className="text-sm font-bold pr-3 text-red-700 dark:text-white">
					{newPrice}
				</span>
				<span className="text-sm font-bold line-through text-gray-500 dark:text-white">
					{oldPrice}
				</span>
				<div className="flex space-x-2 text-sm font-semibold tracking-tight">
					<div className=" text-red-600">{currentPrice}</div>
					<div className="flex items-center space-x-1 text-sm rtl:space-x-reverse">
						<svg
							className="w-4 h-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className="w-4 h-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className="w-4 h-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className="w-4 h-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
						<svg
							className="w-4 h-4 text-gray-200 dark:text-gray-600"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
						</svg>
					</div>
					<div>{rating}</div>
				</div>
			</div>
			{showNewButton && (
				<button className="mt-2 bg-green-500 text-white px-4 py-1 rounded absolute top-2 left-4">
					New
				</button>
			)}
		</div>
	);
}

// import React from 'react';
// import Link from 'next/link'

// type TitleProps = {
//     name: string;
//     bgClass?: string; // Optional prop for background image class
//     height?: string; // Optional prop for height
//     width?: string; // Optional prop for width
//     oldPrice?: string;
//     newPrice?: string;
//     rating?: string;
//     style?: React.CSSProperties;

// };

// export default function Card({ name, oldPrice, newPrice, rating, bgClass = 'bg-red-600', height = 'h-14', width = 'w-48' }: TitleProps) {
//     return (
//         <div className="  rounded-lg dark:bg-gray-800 dark:border-gray-700">

//              <div className={`  ${bgClass} ${height} ${width}  flex justify-center h-[250px] w-[270px] pt-8 bg-gray-200`}>
//              <Link href="#" >

//               </Link>
//              </div>

//               <div className="flex items-center justify-between relative ">
//                   <Link href="#" className="w-[270px] text-white bg-black absolute bottom-0 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-b-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</Link>
//               </div>

//               <div className="mt-2 pb-5">
//                   <Link href="#">
//                       <h3 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h3>
//                   </Link>
//                   <span className="text-sm font-bold pr-3 text-red-700 dark:text-white">{newPrice}</span>
//                   <span className="text-sm font-bold line-through text-gray-500  dark:text-white">{oldPrice}</span>
//                   <div className="flex items-center mt-1 ">
//                       <div className="flex items-center space-x-1 text-sm rtl:space-x-reverse">
//                           <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                           </svg>
//                           <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                           </svg>
//                           <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                           </svg>
//                           <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                           </svg>
//                           <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                               <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
//                           </svg>
//                       </div>
//                       <span className=" text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">({rating})</span>
//                   </div>

//               </div>
//           </div>
//     );
// }
