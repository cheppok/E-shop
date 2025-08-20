import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Product from "../../../model/product"; 

// CREATE PRODUCT
export async function POST(req: Request) {
  try {
    // await connectDB();
    await connectToDatabase();

    const body = await req.json();
    const { name, price, color, imageUrl, description, category } = body;

    if (!name || !price || !color || !imageUrl || !category) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
      
    }
    

    const product = await Product.create({
      name,
      price: Number(price),
      color,
      imageUrl,
      description,
      category,

    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}



export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { color: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: "i" }; // case-insensitive match
    }

    const products =
      search || category
        ? await Product.find(query).sort({ createdAt: -1 }).lean()
        : await Product.find(query).sort({ createdAt: -1 }).limit(10).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json([], { status: 500 });
  }
}
