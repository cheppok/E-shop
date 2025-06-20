import React from "react";

interface containerProps {
	children: React.ReactNode;
}

const Container: React.FC<containerProps> = ({ children }) => {
	return (
		<div className="max-w-[1920] mx-auto px-4 md:px-2 xl:px-20">
			{children}
		</div>
	);
};
export default Container;
