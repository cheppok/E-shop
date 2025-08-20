import FAQ from "./faqs";

export default function FAQPage() {
	const faqItems = [
		{
			question: "How can I place an order?",
			answer: "Simply browse our products, add items to your cart, and proceed to checkout.",
		},
		{
			question: "What payment methods do you accept?",
			answer: "We accept major credit/debit cards, PayPal, and mobile wallet payments.",
		},
		{
			question: "How long will delivery take?",
			answer: "Orders are processed within 1–2 business days. Delivery usually takes 3–7 business days depending on your location.",
		},
		{
			question: "Do you offer international shipping?",
			answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by destination.",
		},
		{
			question: "What is your return policy?",
			answer: "We accept returns within 14 days of delivery. Items must be unused and in original packaging.",
		},
		{
			question: "Can I track my order?",
			answer: "Yes! Once your order is shipped, you’ll receive a tracking number via email or SMS.",
		},
		{
			question: "Are my payment details secure?",
			answer: "Absolutely. We use SSL encryption and trusted payment gateways to keep your data safe.",
		},
		{
			question: "Do you offer discounts or promotions?",
			answer: "Yes! Subscribe to our newsletter or follow us on social media to get updates on deals.",
		},
	];

	return (
		<main className="max-w-4xl mx-auto px-4 py-16">
			<h1 className="text-3xl font-bold text-center mb-8">
				Frequently Asked Questions
			</h1>
			<FAQ items={faqItems} />
		</main>
	);
}
