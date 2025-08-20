import React from "react";

type title = {
	name: string;
};

export default function SectionTitle(title: title) {
	return (
		<div>
			<section className="mt-20 ml-32">
				<div className="flex items-center space-x-4 text-sm text-red-600 font-semibold dark:text-slate-200">
					<div className="h-8 w-4 rounded-sm bg-red-600 dark:bg-slate-200"></div>
					<span>{title.name}</span>
				</div>
			</section>
		</div>
	);
}
