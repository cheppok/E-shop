 type UserType = {
    id: string;
    name: string;
    email: string;
    emailVerified: null;
    image: string;
    hashedPassword: null;
    createdAt: string;
    updatedAt: string;
    role: string;
};

 type ReviewType = {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment: string;
    createdDate: string;
    user: UserType;
};

export type reviewsType = ReviewType[];

export type cartProductType = {
	id: string;
	name: string;
	description: string;
	category: string;
	brand: string;
	selectedimg: SelectedimgType;
	quantity: number;
	price: number;
};

export type SelectedimgType = {
	color: string;
	colorCode: string;
	image: string;
};

export type productType = {
    id: string;
		name: string;
		description: string;
		category: string;
		brand: string;
		selectedimg?: SelectedimgType;
		quantity?: number;
		price: number;

		images: SelectedimgType[];

		inStock: boolean;
		reviews?: reviewsType;
}