import React from "react";
// import AddProductForm from "./addProductForm";
import Container from "../../components/container";
import { getCurrentUser } from "@/actions/getCurrent User";
import NullData from "../../components/nullData";
import ProductForm from "../productForm";

const AddProducts = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser || currentUser.role !== "ADMIN")
		return <NullData title="You are not an ADMIN" />;

	return (
		<div className="flex justify-center">
			<div className="p-8 w-4/6 ">
				<Container>
					{/* <AddProductForm /> */}
					<ProductForm />
				</Container>
			</div>
		</div>
	);
};

export default AddProducts;
