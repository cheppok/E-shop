import React from "react";
import AdminNav from "../components/adminNav/adminNav";

export const metadata = {
	title: "E-shop Admin",
	Description: "Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div>
				<AdminNav />
			</div>

			{children}
		</div>
	);
};

export default AdminLayout;
