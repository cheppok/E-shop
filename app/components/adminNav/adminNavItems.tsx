import React from "react";

interface adminNavItemsProps {
	selected?: boolean;
	label: string;
}
const AdminNavItems: React.FC<adminNavItemsProps> = ({ selected, label }) => {
	return (
		<div
			className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
				selected
					? "border-b-slate-800 text-slate-600"
					: "border-transparent text-slate-500 "
			}`}
		>
			<div className="font-medium test-sm text-center break-normal">
				{" "}
				{label}
			</div>
		</div>
	);
};

export default AdminNavItems;
