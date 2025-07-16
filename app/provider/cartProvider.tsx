// "use client";

// import React from "react";
// import { CartcContextProvider } from "../hooks/useCart";

// interface cartProviderProps {
// 	children: React.ReactNode;
// }

// export const CartProvider: React.FC<cartProviderProps> = ({ children }) => {
// 	return <CartcContextProvider>{children}</CartcContextProvider>;
// };

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
