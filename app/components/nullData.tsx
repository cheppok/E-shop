import React from "react";
interface nullDataProps {
	title: string;
}
const NullData: React.FC<nullDataProps> = ({ title }) => {
	return (
		<div className="w-full h-[50vh] text-2xl md:2xl: flex justify-center items-center">
			{title}
		</div>
	);
};

export default NullData;
