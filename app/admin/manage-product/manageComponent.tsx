"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
	_id: string;
	name: string;
	price: number;
	color: string;
	imageUrl: string;
	description: string;
	category: string;
}

export default function ManageComponent() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loadingIds, setLoadingIds] = useState<string[]>([]);
	const [updatedFields, setUpdatedFields] = useState<{
		[key: string]: Partial<Product>;
	}>({});

	// Fetch products on mount
	useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await fetch("/api/products");
				const data = await res.json();
				setProducts(data);
			} catch (err) {
				console.error(err);
			}
		}
		fetchProducts();
	}, []);

	// Handle any input change
	function handleInputChange(
		productId: string,
		field: keyof Product,
		value: string | number
	) {
		setUpdatedFields((prev) => ({
			...prev,
			[productId]: {
				...prev[productId],
				[field]: field === "price" ? Number(value) : value,
			},
		}));
	}

	// Update product
	async function updateProduct(productId: string) {
		const fields = updatedFields[productId];
		if (!fields || Object.keys(fields).length === 0) {
			return alert("No changes to update");
		}

		setLoadingIds((prev) => [...prev, productId]);

		try {
			const res = await fetch(`/api/products/${productId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fields),
			});

			const data = await res.json();
			console.log("Updated product:", data);

			setProducts((prev) =>
				prev.map((p) => (p._id === productId ? { ...p, ...fields } : p))
			);

			setUpdatedFields((prev) => ({ ...prev, [productId]: {} }));
			alert("succeessfully updated");
		} catch (err) {
			console.error(err);
			alert("Failed to update product");
		} finally {
			setLoadingIds((prev) => prev.filter((id) => id !== productId));
		}
	}

	// 🔹 Delete product
	async function deleteProduct(productId: string) {
		if (!confirm("Are you sure you want to delete this product?")) return;

		setLoadingIds((prev) => [...prev, productId]);

		try {
			const res = await fetch(`/api/products/${productId}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				throw new Error("Failed to delete product");
			}

			// Remove from state
			setProducts((prev) => prev.filter((p) => p._id !== productId));
		} catch (err) {
			console.error(err);
			alert("Failed to delete product");
		} finally {
			setLoadingIds((prev) => prev.filter((id) => id !== productId));
		}
	}

	return (
		<div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{products.map((product) => (
				<div
					key={product._id}
					className="border rounded-lg shadow p-4 flex flex-col items-center"
				>
					{/* Product Image */}
					<div className="relative w-40 h-40 mb-2">
						<Image
							src={product.imageUrl}
							alt={product.name}
							fill
							className="object-cover rounded"
						/>
					</div>

					{/* Editable Fields */}
					<input
						type="text"
						placeholder="name"
						defaultValue={product.name}
						onChange={(e) =>
							handleInputChange(
								product._id,
								"name",
								e.target.value
							)
						}
						className="border rounded px-2 py-1 mt-2 w-full text-sm"
					/>
					<input
						type="text"
						placeholder="category"
						defaultValue={product.category}
						onChange={(e) =>
							handleInputChange(
								product._id,
								"category",
								e.target.value
							)
						}
						className="border rounded px-2 py-1 mt-2 w-full text-sm"
					/>
					<textarea
						placeholder="description"
						defaultValue={product.description}
						onChange={(e) =>
							handleInputChange(
								product._id,
								"description",
								e.target.value
							)
						}
						className="border rounded px-2 py-1 mt-2 h-32 w-full text-sm"
					/>
					<input
						type="number"
						placeholder="price"
						defaultValue={product.price}
						onChange={(e) =>
							handleInputChange(
								product._id,
								"price",
								e.target.value
							)
						}
						className="border rounded px-2 py-1 mt-2 w-full text-sm"
					/>
					<input
						type="text"
						placeholder="color"
						defaultValue={product.color}
						onChange={(e) =>
							handleInputChange(
								product._id,
								"color",
								e.target.value
							)
						}
						className="border rounded px-2 py-1 mt-2 w-full text-sm"
					/>
					<input
						type="text"
						defaultValue={product.imageUrl}
						onChange={(e) =>
							handleInputChange(
								product._id,
								"imageUrl",
								e.target.value
							)
						}
						className="border rounded px-2 py-1 mt-2 w-full text-sm"
					/>

					{/* Action Buttons */}
					<div className="flex gap-2 mt-3">
						<button
							onClick={() => updateProduct(product._id)}
							disabled={loadingIds.includes(product._id)}
							className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
						>
							{loadingIds.includes(product._id)
								? "Updating..."
								: "Update"}
						</button>

						<button
							onClick={() => deleteProduct(product._id)}
							disabled={loadingIds.includes(product._id)}
							className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
						>
							{loadingIds.includes(product._id)
								? "Deleting..."
								: "Delete"}
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
