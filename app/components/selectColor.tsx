"ise client";

import React from "react";

import { ImageType } from "../types/types";

import { useCallback, useState, useEffect } from "react";
import SelectImage from "./input/selectImage";

interface SelectColorProps {
	item: ImageType;
	addImageToState: (value: ImageType) => void;
	removeImageFromState: (value: ImageType) => void;
	isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
	item,
	addImageToState,
	removeImageFromState,
	isProductCreated,
}) => {
	const [isSelected, setIsSelected] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	useEffect(() => {
		if (isProductCreated) {
			setIsSelected(false);
			setFile(null);
		}
	}, [isProductCreated]);

	const handleFileChange = useCallback((value: File) => {
		setFile(value);
		addImageToState({ ...item, image: value });
	}, []);

	const handleCheck = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setIsSelected(e.target.checked);
			if (!e.target.checked) {
				setFile(null);
				removeImageFromState(item);
			}
		},
		[]
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
			<div className="flex flex-row gap-2 items-center h-[60px]">
				<input
					type="checkbox"
					id={item.color}
					checked={isSelected}
					onChange={handleCheck}
					className="cursor-pointer "
				/>
				<label
					htmlFor={item.color}
					className="font-medium cursor-pointer"
				>
					{item.color}
				</label>
			</div>
			<>
				{isSelected && !file && (
					<div className="col-span-2 text-center">
						<SelectImage
							handleFileChange={handleFileChange}
							item={item}
						/>
					</div>
				)}
				{file && (
					<div className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between">
						<p>{file.name}</p>
						<div>
							<button
								className="w-70px"
								onClick={() => {
									setFile(null);
									removeImageFromState(item);
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</>
		</div>
	);
};

export default SelectColor;
