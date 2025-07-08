"use client";

import React from "react";
import { CartcContextProvider } from "../hooks/useCart";

interface cartProviderProps {
	children: React.ReactNode;
}

export const CartProvider: React.FC<cartProviderProps> = ({ children }) => {
	return <CartcContextProvider>{children}</CartcContextProvider>;
};
