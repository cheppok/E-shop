import React from "react";

interface backDropProps {
	onClick: () => void;
}
const Backdrop: React.FC<backDropProps> = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className="z-20 bg-slate-500 opacity-50 w-screen h-screen fixed top-0 left-0"
		></div>
	);
};

export default Backdrop;
