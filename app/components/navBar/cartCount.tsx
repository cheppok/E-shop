// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "../../hooks/useCart";
// import Image from "next/image";

// const CartCount = () => {
// 	const { cartTotalQty } = useCart();
// 	const router = useRouter();

// 	return (
// 		<div
// 			onClick={() => router.push("/cart")}
// 			className="relative cursor-pointer"
// 		>
// 			<div>
// 				<Image src={"/cart.png"} alt="" width={30} height={30} />
// 			</div>
// 			<span className=" absolute top-[-12px] right-[2px]">
// 				{cartTotalQty}
// 			</span>
// 		</div>
// 	);
// };

// export default CartCount;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../hooks/useCart";
import Image from "next/image";
import { useSession } from "next-auth/react"; // ✅ Import session hook

const CartCount = () => {
	const { cartTotalQty } = useCart();
	const router = useRouter();
	const { data: session } = useSession(); // ✅ Get session data

	return (
		<div
			onClick={() => router.push("/cart")}
			className="relative cursor-pointer"
		>
			<div>
				<Image src={"/cart.png"} alt="" width={30} height={30} />
			</div>

			{/* ✅ Only show quantity if user is logged in */}
			{session?.user && (
				<span className="absolute top-[-12px] right-[2px]">
					{cartTotalQty}
				</span>
			)}
		</div>
	);
};

export default CartCount;
