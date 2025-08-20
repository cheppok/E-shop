"use client";

import React, { createContext, useState, useEffect } from "react";

import { productType } from "../app/types/types";

// context/productContext.tsx

interface ProductsContextType {
	products: productType[];
	setProducts: React.Dispatch<React.SetStateAction<productType[]>>;
}

export const ProductsContext = createContext<ProductsContextType>({
	products: [],
	setProducts: () => {},
});

export const ProductsProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [products, setProducts] = useState<productType[]>([]);

	// fetch initial products when app loads
	useEffect(() => {
		async function fetchProducts() {
			try {
				const res = await fetch("/api/products");
				const data = await res.json();
				if (data.success) {
					setProducts(data.products);
				}
			} catch (err) {
				console.error("Failed to fetch products:", err);
			}
		}
		fetchProducts();
	}, []);

	return (
		<ProductsContext.Provider value={{ products, setProducts }}>
			{children}
		</ProductsContext.Provider>
	);
};
