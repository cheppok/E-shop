import React from "react";
import ManageComponent from "./manageComponent";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../../components/nullData";

const ManageProduct = async () => {
	const currentUser = await getCurrentUser();
	if (!currentUser || currentUser.role !== "ADMIN")
		return <NullData title="You are not an ADMIN" />;

	return (
		<div>
			<ManageComponent />
		</div>
	);
};

export default ManageProduct;
