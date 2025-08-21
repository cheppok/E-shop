export const dynamic = "force-dynamic";
import React from "react";
import Contact from "./contact";
import Container from "../components/container";

const ContactPage = () => {
	return (
		<Container>
			<div>
				<Contact />
			</div>
		</Container>
	);
};

export default ContactPage;
