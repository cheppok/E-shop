import React from "react";
import Container from "../components/container";
import CartClient from "./cartClient";

const Cart = () => {
	return (
		<div className="pt8">
			<Container>
				<CartClient />
			</Container>
		</div>
	);
};
export default Cart;
