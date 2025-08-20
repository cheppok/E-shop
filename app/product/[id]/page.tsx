"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useCart } from "../../hooks/useCart";
import ReUsableButton from "../../components/reusableButton";

import Link from "next/link";

interface Product {
	_id: string;
	name: string;
	price: number;
	color: string;
	imageUrl?: string;
	brand?: string;
	description: string;
	category: string;
}

export default function ProDetailsPage() {
	const { id } = useParams();
	const { handleAddItemsToCart, cartItems } = useCart();

	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [isItemInCart, setIsItemInCart] = useState(false);

	useEffect(() => {
		async function fetchProduct() {
			try {
				const res = await fetch(`/api/products/${id}`);
				if (!res.ok) throw new Error("Failed to fetch product");
				const data: Product = await res.json();
				setProduct(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		fetchProduct();
	}, [id]);

	// Check if product is already in the cart
	useEffect(() => {
		if (product) {
			setIsItemInCart(
				cartItems?.some((item) => item._id === product._id) || false
			);
		}
	}, [cartItems, product]);

	// Prepare cart product with guaranteed image and cartItemId
	const cartProduct = useMemo(() => {
		if (!product) return null;
		return {
			_id: product._id,
			name: product.name,
			price: product.price,
			color: product.color,
			imageUrl: product.imageUrl ?? "/placeholder.png",
			quantity: 1,
			brand: product.brand || "Unknown",
			cartItemId: crypto.randomUUID(), // ✅ unique per cart entry
			description: product.description,
			category: product.category,
		};
	}, [product]);

	if (loading) {
		return <p className="p-8 text-center">Loading...</p>;
	}

	if (!product) {
		return (
			<p className="p-8 text-center text-red-500">Product not found.</p>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
			<div className="relative w-full aspect-square flex items-start justify-center">
				<Image
					src={product.imageUrl || "/placeholder.png"}
					alt={product.name || "Product image"}
					width={400}
					height={400}
					className="object-contain"
					priority
				/>
			</div>

			<div className="flex flex-col justify-start  gap-4 mr-12 ">
				<h1 className="text-2xl font-bold">{product.name}</h1>
				<h1 className="text-2xl">Description</h1>
				<p>{product.description}</p>

				<p className="text-lg font-semibold text-gray-700">
					${product.price}
				</p>
				<p className="text-sm font-semibold text-gray-700">
					Color: {product.color}
				</p>

				<button
					onClick={() =>
						cartProduct && handleAddItemsToCart(cartProduct)
					}
					disabled={isItemInCart}
					className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
				>
					{isItemInCart ? "Already in Cart" : "Add to Cart"}
				</button>
				<Link href={"/"} className="flex justify-center">
					<ReUsableButton
						bgColor="brown"
						width="20rem"
						className="flex justify-center items-center"
					>
						<h2>Continue Shopping...</h2>
					</ReUsableButton>
				</Link>
			</div>
		</div>
	);
}
