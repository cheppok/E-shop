import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    const { name, price, imageUrl } = await req.json();

    if (!name || !price || !imageUrl) {
      return NextResponse.json({ success: false, error: "Missing fields" });
    }

    await client.connect();
    const db = client.db("testdb"); // change to your DB name
    const products = db.collection("products");

    const result = await products.insertOne({
      name,
      price,
      imageUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, result });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  } finally {
    await client.close();
  }
}
