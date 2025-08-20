import Image from "next/image";
import SearchInput from "./searchInput"; // adjust path as needed
import { TruncateText } from "../../utils/truncateText";

interface Product {
	_id: string;
	name: string;
	price: number;
	color: string;
	imageUrl: string;
	description: string;
	category?: string;
}

export default async function SearchPage({
	searchParams,
}: {
	searchParams: { query?: string; category?: string };
}) {
	const query = searchParams.query || "";
	const category = searchParams.category || "";

	// Build API URL with both query + category
	const apiUrl = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
	if (query) apiUrl.searchParams.set("search", query);
	if (category) apiUrl.searchParams.set("category", category);

	const res = await fetch(apiUrl.toString(), { cache: "no-store" });
	const products: Product[] = await res.json();

	return (
		<div className="max-w-5xl mx-auto px-4 py-8">
			{/* 🔎 Search bar at top */}
			<SearchInput />

			<h1 className="text-2xl font-bold mb-6 mt-6">
				{category ? (
					<>
						Category:{" "}
						<span className="text-blue-600">{category}</span>
					</>
				) : query ? (
					<>
						Search Results for:{" "}
						<span className="text-blue-600">{query}</span>
					</>
				) : (
					"Products"
				)}
			</h1>

			{products.length === 0 ? (
				<p className="text-gray-500">No products found.</p>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products.map((product) => (
						<div
							key={product._id}
							className=" flex gap-4 border rounded-lg p-4 hover:shadow-md"
						>
							<div>
								<Image
									src={product.imageUrl}
									alt={product.name}
									width={200}
									height={200}
									className="rounded-md"
								/>
							</div>
							<div>
								<h2 className="font-semibold mt-2">
									{TruncateText(product.name)}
									{/* {product.name} */}
								</h2>
								<p className="text-gray-600 text-sm">
									{product.color}
								</p>
								<p className="text-blue-600 font-bold">
									${product.price}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
