export const dynamic = "force-dynamic";

import React from "react";
// import AddProductForm from "./addProductForm";
import Container from "../../components/container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../../components/nullData";
import ProductForn from "./productForm";

const AddProducts = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser || currentUser.role !== "ADMIN")
		return <NullData title="You are not an ADMIN" />;

	return (
		<div className="flex justify-center">
			<div className="p-8 w-4/6 ">
				<Container>
					<ProductForn />
				</Container>
			</div>
		</div>
	);
};

export default AddProducts;
