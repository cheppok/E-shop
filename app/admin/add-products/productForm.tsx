"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { ProductsContext } from "../../../context/productContext";

export default function ProductForm() {
	const { setProducts } = useContext(ProductsContext);

	const [formData, setFormData] = useState({
		name: "",
		price: "",
		color: "",
		imageUrl: "",
		description: "",
		category: "", // 👈 added category
	});
	const [loading, setLoading] = useState(false);
	const [uploadingImage, setUploadingImage] = useState(false);

	// Handles image upload to Cloudinary
	async function handleImageUpload(file: File) {
		setUploadingImage(true);
		try {
			const form = new FormData();
			form.append("file", file);
			form.append("upload_preset", "myShopUploads");

			const res = await fetch(
				"https://api.cloudinary.com/v1_1/dzzic0w4t/image/upload",
				{
					method: "POST",
					body: form,
				}
			);

			const data = await res.json();
			if (data.secure_url) {
				setFormData((prev) => ({
					...prev,
					imageUrl: data.secure_url,
				}));
				alert("✅ Image uploaded successfully!");
			} else {
				alert("❌ Failed to upload image. Check Cloudinary settings.");
			}
		} catch (err) {
			console.error(err);
			alert("❌ Error uploading image.");
		} finally {
			setUploadingImage(false);
		}
	}

	// Handles form submit
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (
			!formData.name ||
			!formData.price ||
			!formData.color ||
			!formData.imageUrl ||
			!formData.description ||
			!formData.category // 👈 validate category
		) {
			alert("All fields are required");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...formData,
					price: Number(formData.price),
				}),
			});

			const data = await res.json();
			if (data.success) {
				alert("✅ Product created successfully!");

				setProducts((prev: any[]) => [...prev, data.product]);

				// Reset form
				setFormData({
					name: "",
					price: "",
					color: "",
					imageUrl: "",
					description: "",
					category: "",
				});
			} else {
				alert(data.error || "❌ Failed to create product");
			}
		} catch (err) {
			console.error(err);
			alert("❌ Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="p-6 max-w-lg mx-auto">
			<h1 className="text-xl font-bold mb-4">Add Product</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					placeholder="Name"
					value={formData.name}
					onChange={(e) =>
						setFormData({ ...formData, name: e.target.value })
					}
					className="border p-2 w-full"
				/>

				<input
					placeholder="Price"
					type="number"
					value={formData.price}
					onChange={(e) =>
						setFormData({ ...formData, price: e.target.value })
					}
					className="border p-2 w-full"
				/>

				<textarea
					placeholder="Description"
					value={formData.description}
					onChange={(e) =>
						setFormData({
							...formData,
							description: e.target.value,
						})
					}
					className="border p-2 h-40 w-full"
				/>

				<input
					placeholder="Color"
					value={formData.color}
					onChange={(e) =>
						setFormData({ ...formData, color: e.target.value })
					}
					className="border p-2 w-full"
				/>

				{/* 👇 Plain text category */}
				<input
					placeholder="Category (e.g. phones, tv, mens wear)"
					value={formData.category}
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
					className="border p-2 w-full"
				/>

				<input
					type="file"
					accept="image/*"
					onChange={(e) => {
						if (e.target.files?.[0]) {
							handleImageUpload(e.target.files[0]);
						}
					}}
					className="border p-2 w-full"
				/>

				{uploadingImage && (
					<p className="text-sm text-gray-500">Uploading image...</p>
				)}

				{formData.imageUrl && !uploadingImage && (
					<p className="text-sm text-green-600">
						✅ Image uploaded successfully!
					</p>
				)}

				{formData.imageUrl && (
					<Image
						src={formData.imageUrl}
						alt="Preview"
						width={160}
						height={160}
						className="mt-2 object-cover rounded"
					/>
				)}

				<button
					type="submit"
					disabled={
						loading ||
						uploadingImage ||
						!formData.name ||
						!formData.price ||
						!formData.color ||
						!formData.imageUrl ||
						!formData.category
					}
					className={`px-4 py-2 rounded text-white ${
						loading || uploadingImage
							? "bg-gray-400"
							: "bg-blue-500 hover:bg-blue-600"
					}`}
				>
					{loading ? "Saving..." : "Save Product"}
				</button>
			</form>
		</div>
	);
}
