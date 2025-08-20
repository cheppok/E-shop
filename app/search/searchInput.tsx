"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get("query") || "";

	const [query, setQuery] = useState(initialQuery);

	// Sync input with URL when navigating back/forward
	useEffect(() => {
		setQuery(initialQuery);
	}, [initialQuery]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			router.push(`/search?query=${encodeURIComponent(query)}`);
		}
	};

	return (
		<form
			onSubmit={handleSearch}
			className="w-full max-w-lg mx-auto flex items-center gap-2"
		>
			<input
				type="text"
				placeholder="Search products..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
			>
				Search
			</button>
		</form>
	);
}
