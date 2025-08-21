

// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/model/product";
import { Types } from "mongoose";

// ✅ GET single product
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const product = await Product.findById(params.id).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("❌ GET /products/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ PATCH update product
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(params.id, body, {
      new: true,
    }).lean();

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("❌ PATCH /products/[id] error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// ✅ DELETE product
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("❌ DELETE /products/[id] error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// import { NextResponse, type NextRequest } from "next/server";

// import Product from "@/model/product";

// // Next.js gives us this context type automatically
// type Context = {
//   params: { id: string };
// };

// // GET /api/products/[id]
// export async function GET(_req: NextRequest, context: Context) {
//   const { id } = context.params;

//   try {
//     await connectToDatabase();
//     const product = await Product.findById(id);

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// // PATCH /api/products/[id]
// export async function PATCH(req: NextRequest, context: Context) {
//   const { id } = context.params;

//   try {
//     await connectToDatabase();
//     const body = await req.json();

//     const product = await Product.findByIdAndUpdate(id, body, { new: true });

//     if (!product) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error("PATCH error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// // DELETE /api/products/[id]
// export async function DELETE(_req: NextRequest, context: Context) {
//   const { id } = context.params;

//   try {
//     await connectToDatabase();
//     const deleted = await Product.findByIdAndDelete(id);

//     if (!deleted) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("DELETE error:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const product = await prisma.product.findUnique({
//       where: { id: params.id },
//     });

//     if (!product) {
//       return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, product });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
//   }
// }
