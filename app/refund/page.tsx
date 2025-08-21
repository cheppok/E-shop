export const dynamic = "force-dynamic";
import React from "react";
import Container from "../components/container";

const Refund = () => {
	return (
		<Container>
			<div className=" p-8">
				<p className="text-2xl font-semibold mt-2">1. Eligibility</p>

				<p>
					Items must be returned within [7/14/30] days of delivery.
					Products must be unused, in original packaging, and in the
					same condition as received. Proof of purchase (e.g., order
					number or receipt) is required.
				</p>

				<p className="text-2xl font-semibold m-2">2. Refunds</p>
				<p>
					Approved refunds will be issued to your original method of
					payment within [5–10 business days]. Shipping costs are
					non-refundable, unless the return is due to an error on our
					part (wrong or defective item).
				</p>

				<p className="text-2xl font-semibold m-2">3. Exchanges</p>
				<p>
					We offer exchanges for different sizes, colors, or
					replacement of defective items. If the requested item is
					unavailable, we will issue a full refund.
				</p>

				<p className="text-2xl font-semibold m-2">
					4. Non-Returnable Items
				</p>

				<p>
					Gift cards, downloadable products, and items marked final
					sale cannot be returned or exchanged.
				</p>

				<p className="text-2xl font-semibold m-2">
					5. How to Request a Return/Exchange
				</p>

				<p>
					Contact us at [your support email/phone] with your order
					number. Our team will provide instructions and a return
					shipping address. Pack the item securely and include proof
					of purchase.
				</p>
			</div>
		</Container>
	);
};

export default Refund;
