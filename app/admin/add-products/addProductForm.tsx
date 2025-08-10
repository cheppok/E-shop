"use client";

import React, { useState, useRef, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import Input from "../../components/input/input";
import TextArea from "../../components/input/textArea";
import CustomCheckBox from "../../components/input/customCheckBox";
import SelectColor from "../../components/selectColor";
import { categories } from "../../../utils/categories/categories";
import { Colors } from "../../../utils/setColor/setColor";
import { ImageType } from "../../types/types";
import Image from "next/image";
import toast from "react-hot-toast";

// Image upload handler
// Image upload handler
async function handleImageUpload(file: File, color: string, colorCode: string) {
	if (!file) throw new Error("No file provided");

	const formData = new FormData();
	formData.append("file", file);
	formData.append("color", color);
	formData.append("colorCode", colorCode);

	const res = await fetch("/api/upload", {
		method: "POST",
		body: formData,
	});

	if (!res.ok) throw new Error("Image upload failed");
	return (await res.json()) as {
		url: string;
		color: string;
		colorCode: string;
	};
}

const AddProductForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isProductCreated, setIsProductCreated] = useState(false);
	const [images, setImages] = useState<ImageType[]>([]);
	const [successMessage, setSuccessMessage] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			description: "",
			price: "",
			brand: "",
			category: "",
			inStock: false,
			images: [],
		},
	});

	const category = watch("category");
	const categoryRef = useRef<HTMLDivElement>(null);

	// Set custom field value
	const setCustomValues = useCallback(
		(id: string, value: string) => {
			setValue(id, value, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
		},
		[setValue]
	);

	// Add or update image for a color
	const addImageToState = useCallback((value: ImageType) => {
		setImages((prev) => {
			const exists = prev.some((img) => img.color === value.color);
			return exists
				? prev.map((img) => (img.color === value.color ? value : img))
				: [...prev, value];
		});
	}, []);

	const removeImageFromState = useCallback((value: ImageType) => {
		setImages((prev) => prev.filter((img) => img.color !== value.color));
	}, []);

	// Submit handler
	const onSubmit = async (data: FieldValues) => {
		setIsLoading(true);
		try {
			const uploadedImages: {
				image: string;
				color: string;
				colorCode: string;
			}[] = [];

			for (const img of images) {
				// Skip any colors without a file
				if (!img.image) continue;

				const uploaded = await handleImageUpload(
					img.image, // ✅ now guaranteed File
					img.color,
					img.colorCode
				);

				uploadedImages.push({
					image: uploaded.url,
					color: uploaded.color,
					colorCode: uploaded.colorCode,
				});
			}

			// Build payload
			const productPayload = {
				...data,
				images: uploadedImages,
			};

			const res = await fetch("/api/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(productPayload),
			});

			if (!res.ok) throw new Error("Product creation failed");

			toast.success("Product added!");
			reset();
			setImages([]);
			setSuccessMessage("Product created successfully.");
			setIsProductCreated(true);
		} catch (err) {
			toast.error("Something went wrong");
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<h2 className="text-2xl font-bold text-center">Add a Product</h2>

			{/* Basic Info */}
			<div className="flex flex-col gap-4">
				<Input
					id="name"
					type="text"
					register={register}
					label="Name"
					disabled={isLoading}
					required
					errors={errors}
				/>
				<Input
					id="price"
					type="number"
					register={register}
					label="Price"
					disabled={isLoading}
					required
					errors={errors}
				/>
				<Input
					id="brand"
					type="text"
					register={register}
					label="Brand"
					disabled={isLoading}
					required
					errors={errors}
				/>
				<TextArea
					id="description"
					label="Description"
					register={register}
					errors={errors}
					disabled={isLoading}
					required
				/>
				<CustomCheckBox
					id="inStock"
					label="This product is in stock"
					register={register}
				/>
			</div>

			{/* Categories */}
			<div className="font-medium w-full">
				<h3 className="font-semibold m-4 text-xl">Select Category</h3>
				<div
					ref={categoryRef}
					className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-3"
				>
					{categories
						.filter((item) => item.label !== "ALL")
						.map((item) => (
							<div
								key={item.label}
								className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center transition ${
									category === item.label
										? "border-slate-500"
										: "border-slate-200"
								}`}
								onClick={() =>
									setCustomValues("category", item.label)
								}
							>
								<Image
									src={item.icon}
									width={100}
									height={100}
									alt={item.label}
								/>
								<p>{item.label}</p>
							</div>
						))}
				</div>
			</div>

			{/* Colors and Images */}
			<div className="w-full flex flex-col gap-4">
				<h3 className="font-bold">
					Select available color and upload image
				</h3>
				<p className="text-sm text-gray-600">
					You must add an image for each color you select, or it will
					be ignored.
				</p>
				<div className="grid grid-cols-2 gap-3">
					{Colors.map((item, index) => (
						<SelectColor
							key={index}
							item={item}
							addImageToState={addImageToState}
							removeImageFromState={removeImageFromState}
							isProductCreated={isProductCreated}
						/>
					))}
				</div>
			</div>

			{/* Submit Button */}
			<div className="flex flex-col items-center mt-6">
				{successMessage && (
					<p className="text-green-600 font-semibold mb-2">
						{successMessage}
					</p>
				)}
				<button
					type="submit"
					className="cursor-pointer rounded bg-black text-white px-6 py-2"
					disabled={
						isLoading ||
						!watch("name") ||
						!watch("price") ||
						!watch("brand") ||
						!watch("description") ||
						!category ||
						images.length === 0
					}
				>
					{isLoading ? "Loading..." : "Add Product"}
				</button>
			</div>
		</form>
	);
};

export default AddProductForm;
