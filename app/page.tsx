import { HomeBanner } from "./components/homeBanner";
import Container from "./components/container";
import { productsData } from "../utils/productsData";
import { TruncateText } from "../utils/truncateText";

export default function Home() {
	return (
		<Container>
			<div className="">
				<div>
					<HomeBanner />
				</div>
				<div className="max-w-[1920] mx-auto px-4 md:px-2 xl:px-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
					{productsData.map((productsData) => {
						return (
							<div key={productsData.id}>
								{TruncateText(productsData.name)}
							</div>
						);
					})}
				</div>
			</div>
		</Container>
	);
}
