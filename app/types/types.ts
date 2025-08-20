 
 
 
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



export interface reviewType {
  rating: number;
  comment?: string;
}


export type cartProductType = {
	_id: string;
	name: string;
	description?: string;
	category?: string;
	brand?: string;
	color?: string
	cartItemId: string;
	// selectedimg: SelectedimgType;
	imageUrl: string
	quantity: number;
	price: number;
	reviews?: ReviewType
	rating?: number
};


export type SelectedimgType = {
	color: string;
	colorCode: string;
	image: string;
};

export type productType = {
    _id: string;
		name: string;
		description: string;
		category: string;
		brand: string;
		// selectedimg?: SelectedimgType;
		imageUrl: string 
		quantity?: number;
		price: number;
		cartItemId: string
color: string
		// images?: SelectedimgType[];

		// inStock?: boolean;
		reviews?: reviewsType;
};
export type ImageType = {
	color: string;
	colorCode: string;
	image: File | null;
};
export type UploadedImageType = {
	color: string;
	colorCode: string;
	image: string;
};


