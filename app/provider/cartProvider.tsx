"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartcContextProvider } from "../hooks/useCart";

interface ProvidersProps {
	children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<SessionProvider>
			<CartcContextProvider>{children}</CartcContextProvider>
		</SessionProvider>
	);
};

export default Providers;
