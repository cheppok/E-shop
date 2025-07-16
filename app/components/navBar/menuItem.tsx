import React from "react";

interface menuItemProps {
	children: React.ReactNode;
	onClick: () => void;
}

const MenuItem: React.FC<menuItemProps> = ({ children, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="px-4 py-3 hover:bg-neutral-100 transition cursor-pointer"
		>
			{children}
		</div>
	);
};

export default MenuItem;
