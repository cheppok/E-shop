// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";

// interface Product {
// 	_id: string;
// 	name: string;
// 	price: number;
// 	color: string;
// 	imageUrl: string;
// 	description: string;
// }

// export default function ProductsListingPage() {
// 	const [products, setProducts] = useState<Product[]>([]);

// 	useEffect(() => {
// 		async function fetchProducts() {
// 			try {
// 				const res = await fetch("/api/products");
// 				const data = await res.json();
// 				if (Array.isArray(data)) {
// 					setProducts(data);
// 				}
// 			} catch (err) {
// 				console.error(err);
// 			}
// 		}
// 		fetchProducts();
// 	}, []);

// 	return (
// 		<div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// 			{products.map((product) => (
// 				<div
// 					key={product._id}
// 					className="border rounded-lg shadow p-4 flex flex-col items-center"
// 				>
// 					{product.imageUrl ? (
// 						<Image
// 							width={150}
// 							height={150}
// 							src={product.imageUrl}
// 							alt={product.name}
// 							className="w-40 h-40 object-cover rounded"
// 						/>
// 					) : (
// 						<div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-500">
// 							No Image
// 						</div>
// 					)}
// 					<h2 className="mt-2 font-semibold">{product.name}</h2>
// 					<p className="text-gray-600">₦{product.price}</p>
// 					<p className="text-gray-600">₦{product.price}</p>
// 					<p className="text-gray-600">₦{product.price}</p>
// 					<p className="text-gray-600">₦{product.description}</p>
// 					<span className="text-sm text-gray-400">
// 						{product.color}
// 					</span>
// 				</div>
// 			))}
// 		</div>
// 	);
// }
