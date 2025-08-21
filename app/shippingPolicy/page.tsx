export const dynamic = "force-dynamic";

import React from "react";
import Container from "../components/container";

const ShippingPolicy = () => {
	return (
		<Container>
			<div className="w-full h-full flex justify-center items-center">
				<div className="w-[900px] h-full flex flex-col gap-4 text-lg mt-8 font-semibold">
					<h1 className="font-bold text-2xl">
						📦 Shipping Policy At E-Shop
					</h1>
					<p>
						we strive to deliver your orders quickly and safely.
						Order Processing All orders are processed within 1-2
						business days.
					</p>
					<p>
						Orders placed on weekends or holidays will be processed
						on the next business day. Domestic Shipping We offer
						standard shipping (3–5 business days) and express
						shipping (1–2 business days) within Nigeria.
					</p>
					<p>
						International Shipping We ship worldwide! Delivery times
						vary by destination, usually between 7–14 business days.
					</p>
					<p>
						{" "}
						Please note that international orders may be subject to
						customs fees, import duties, or taxes, which are the
						responsibility of the customer.
					</p>
					<p>
						{" "}
						Shipping Rates Shipping charges are calculated at
						checkout based on your location and the shipping option
						you select.
					</p>
					<p>
						{" "}
						Occasionally, we run promotions that include free
						shipping. Tracking Orders Once your order has shipped,
						you will receive a confirmation email with a tracking
						number so you can monitor the delivery status.
					</p>
					<p>
						{" "}
						While we do our best to meet estimated delivery times,
						unforeseen circumstances (e.g., weather, customs delays,
						courier issues) may occasionally cause delays
					</p>
					<p>
						If you have any questions about your order’s delivery,
						feel free to contact our support team at
						support@cheppok.com{" "}
					</p>
				</div>
			</div>
		</Container>
	);
};

export default ShippingPolicy;
