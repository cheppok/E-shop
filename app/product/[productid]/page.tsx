"use client";
import React from "react";
import { productsData } from "../../../utils/productsData";
import ProDetailsPage from "./proDetailsPage";
import { useParams } from "next/navigation";

const ProductPage = () => {
	const params = useParams();
	const productId = params?.productid;

	const product = productsData.find((p) => p.id === productId);

	if (!product) {
		return <div className="p-4 text-red-500">Product not found.</div>;
	}

	return (
		<div className="min-h-screen">
			<ProDetailsPage product={product} />
		</div>
	);
};

export default ProductPage;
