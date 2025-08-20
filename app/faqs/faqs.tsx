"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
	question: string;
	answer: string;
}

interface FAQProps {
	items: FAQItem[];
	title?: string;
	smallText?: boolean; // for footer usage
}

export default function FAQ({
	items,
	title = "Frequently Asked Questions",
	smallText = false,
}: FAQProps) {
	return (
		<section className="w-full">
			{title && (
				<h3
					className={`font-semibold mb-3 ${
						smallText ? "text-base" : "text-2xl text-center"
					}`}
				>
					{/* {title} */}
				</h3>
			)}
			<Accordion type="single" collapsible className="w-full space-y-2">
				{items.map((faq, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger
							className={smallText ? "text-sm" : "text-lg"}
						>
							{faq.question}
						</AccordionTrigger>
						<AccordionContent
							className={smallText ? "text-sm" : "text-base"}
						>
							{faq.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
