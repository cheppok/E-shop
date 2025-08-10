// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";

// // ✅ Form validation schema
// const formSchema = z.object({
// 	name: z.string().min(2, "Name is too short"),
// 	price: z.string().regex(/^\d+$/, "Price must be a number"),
// 	color: z.string().min(2, "Color is required"),
// 	colorCode: z.string().min(1, "Color code is required"),
// 	file: z
// 		.instanceof(File)
// 		.refine((file) => file.size > 0, "Image is required"),
// });

// type FormValues = z.infer<typeof formSchema>;

// export default function ProductForm() {
// 	const [loading, setLoading] = useState(false);

// 	const form = useForm<FormValues>({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			name: "",
// 			price: "",
// 			color: "",
// 			colorCode: "",
// 		},
// 	});

// 	// const onSubmit = async (values: FormValues) => {
// 	// 	try {
// 	// 		setLoading(true);

// 	// 		// Build FormData
// 	// 		const formData = new FormData();
// 	// 		formData.append("name", values.name);
// 	// 		formData.append("price", values.price);
// 	// 		formData.append("color", values.color);
// 	// 		formData.append("colorCode", values.colorCode);
// 	// 		formData.append("file", values.file);

// 	// 		const res = await fetch("/api/upload", {
// 	// 			method: "POST",
// 	// 			body: formData,
// 	// 		});

// 	// 		const data = await res.json();
// 	// 		if (!res.ok) throw new Error(data.message || "Upload failed");

// 	// 		toast.success("Product created successfully!");
// 	// 		form.reset();
// 	// 	} catch (error: any) {
// 	// 		console.error(error);
// 	// 		toast("Error creating product");
// 	// 	} finally {
// 	// 		setLoading(false);
// 	// 	}
// 	// };

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!file) return alert("Please select an image");

// 		const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// 		const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// 		// 1️⃣ Upload image to Cloudinary
// 		const formData = new FormData();
// 		formData.append("file", imageFile);
// 		formData.append("upload_preset", uploadPreset!);

// 		const cloudinaryRes = await fetch(
// 			`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
// 			{
// 				method: "POST",
// 				body: formData,
// 			}
// 		);

// 		const cloudinaryData = await cloudinaryRes.json();
// 		const imageUrl = cloudinaryData.secure_url;
// 		if (!imageUrl) return alert("Image upload failed");

// 		// 2️⃣ Save product to MongoDB
// 		const mongoRes = await fetch("/api/products", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ name, price, imageUrl }),
// 		});

// 		const mongoData = await mongoRes.json();
// 		console.log("MongoDB Save Response:", mongoData);

// 		if (mongoData.success) {
// 			alert("Product saved successfully!");
// 			setName("");
// 			setPrice("");
// 			setImageFile(null);
// 		} else {
// 			alert("Failed to save product");
// 		}
// 	};

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
	name: z.string().min(2, "Name is too short"),
	price: z.string().regex(/^\d+$/, "Price must be a number"),
	color: z.string().min(2, "Color is required"),
	// colorCode: z.string().min(1, "Color code is required"),
	file: z
		.instanceof(File)
		.nullable()
		.refine((file) => file !== null && file.size > 0, "Image is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductForm() {
	const [loading, setLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			price: "",
			color: "",
			// colorCode: "",
			file: null, // default empty
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true);

			const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
			const uploadPreset =
				process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

			// 1️⃣ Upload image to Cloudinary
			const formData = new FormData();
			if (!data.file) {
				alert("Please select an image");
				return;
			}

			formData.append("file", data.file); // Now TS knows this is File

			formData.append("file", data.file);
			formData.append("upload_preset", uploadPreset!);

			const uploadRes = await fetch(
				`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
				{
					method: "POST",
					body: formData,
				}
			);

			const uploadData = await uploadRes.json();
			if (!uploadRes.ok)
				throw new Error(uploadData.error?.message || "Upload failed");

			// 2️⃣ Save product in MongoDB
			const res = await fetch("/api/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: data.name,
					price: Number(data.price),
					color: data.color,
					// colorCode: data.colorCode,
					imageUrl: uploadData.secure_url,
				}),
			});

			if (!res.ok) throw new Error("Saving to DB failed");

			alert("Product saved successfully!");
			form.reset();
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
			} else {
				console.error("Unknown error", err);
			}
		}
	};

	console.log("res");
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className="space-y-4 p-4 border rounded-lg"
		>
			{/* Name */}
			<div>
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...form.register("name")} />
				{form.formState.errors.name && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.name.message}
					</p>
				)}
			</div>

			{/* Price */}
			<div>
				<Label htmlFor="price">Price</Label>
				<Input id="price" {...form.register("price")} />
				{form.formState.errors.price && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.price.message}
					</p>
				)}
			</div>

			{/* Color */}
			<div>
				<Label htmlFor="color">Color</Label>
				<Input id="color" {...form.register("color")} />
				{form.formState.errors.color && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.color.message}
					</p>
				)}
			</div>

			{/* Color Code */}
			{/* <div>
				<Label htmlFor="colorCode">Color Code</Label>
				<Input
					id="colorCode"
					{...form.register("colorCode")}
					type="color"
				/>
				{form.formState.errors.colorCode && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.colorCode.message}
					</p>
				)}
			</div> */}

			{/* File Upload */}
			<div>
				<Label htmlFor="file">Product Image</Label>
				<Input
					id="file"
					type="file"
					accept="image/*"
					onChange={(e) => {
						if (e.target.files?.[0]) {
							form.setValue("file", e.target.files[0], {
								shouldValidate: true,
							});
						}
					}}
				/>
				{form.formState.errors.file && (
					<p className="text-red-500 text-sm">
						{form.formState.errors.file.message}
					</p>
				)}
			</div>

			{/* Submit */}
			<Button type="submit" disabled={loading}>
				{loading ? "Uploading..." : "Create Product"}
			</Button>
		</form>
	);
}
