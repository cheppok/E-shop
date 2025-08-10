// import type { NextApiRequest, NextApiResponse } from "next";
// import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// import formidable, { File } from "formidable";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // ✅ Cloudinary config check without crashing route
// if (
//   !process.env.CLOUDINARY_CLOUD_NAME ||
//   !process.env.CLOUDINARY_API_KEY ||
//   !process.env.CLOUDINARY_API_SECRET
// ) {
//   console.error("❌ Missing Cloudinary environment variables");
// }

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const config = { api: { bodyParser: false } };

// const parseForm = (
//   req: NextApiRequest
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
//   new Promise((resolve, reject) => {
//     const form = formidable({ multiples: false });
//     form.parse(req, (err, fields, files) => {
//       if (err) return reject(err);
//       resolve({ fields, files });
//     });
//   });

// const uploadToCloudinary = (filePath: string): Promise<UploadApiResponse> =>
//   new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       filePath,
//       { folder: "eshop-products", use_filename: true, unique_filename: false },
//       (error, result) => {
//         if (error) return reject(error);
//         if (!result) return reject(new Error("No Cloudinary result"));
//         resolve(result);
//       }
//     );
//   });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }

//   try {
//     console.log("📥 Parsing form data...");
//     const { fields, files } = await parseForm(req);

//   const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;
  

// if (!uploadedFile) {
//   return res.status(400).json({ success: false, message: "No file uploaded" });
// }
//     if (!uploadedFile) {
//       console.error("❌ No file uploaded. Fields:", fields, "Files:", files);
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     console.log("☁️ Uploading to Cloudinary...");
//     const uploadResult = await uploadToCloudinary(uploadedFile.filepath);

//     console.log("💾 Saving to database...");
//    // 🛠 Narrow and validate string fields
// const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
// const color = Array.isArray(fields.color) ? fields.color[0] : fields.color;
// const colorCode = Array.isArray(fields.colorCode) ? fields.colorCode[0] : fields.colorCode;
// const priceValue = Array.isArray(fields.price) ? fields.price[0] : fields.price;

// // Optional: validate required fields before hitting DB
// if (!name || !priceValue || !color || !colorCode) {
//   return res.status(400).json({ success: false, message: "Missing required fields" });
// }

// // 💾 Save to DB
// const product = await prisma.product.create({
//   data: {
//     name,
//     price: Number(priceValue),
//     images: {
//       create: [
//         {
//           url: uploadResult.secure_url,
//           color,
//           colorCode,
//         },
//       ],
//     },
//   },
//   include: { images: true },
// });

//     console.log("✅ Upload complete");
//     return res.status(200).json({ success: true, product });
//   } catch (err: any) {
//     console.error("❌ Upload API Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Upload failed",
//       error: err.message || String(err),
//     });
//   }
// }


// // import type { NextApiRequest, NextApiResponse } from "next";
// // import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
// // import formidable, { File } from "formidable";
// // import { MongoClient } from "mongodb";

// // // --- 1️⃣ Cloudinary Config ---
// // if (
// //   !process.env.CLOUDINARY_CLOUD_NAME ||
// //   !process.env.CLOUDINARY_API_KEY ||
// //   !process.env.CLOUDINARY_API_SECRET
// // ) {
// //   throw new Error("Missing Cloudinary environment variables");
// // }

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // --- 2️⃣ Disable Next.js body parsing for file uploads ---
// // export const config = { api: { bodyParser: false } };

// // // --- 3️⃣ MongoDB connection ---
// // const client = new MongoClient(process.env.MONGODB_URI as string);
// // async function connectDB() {
// //   if (!client.topology?.isConnected()) {
// //     await client.connect();
// //   }
// //   return client.db("eshop"); // Change db name as needed
// // }

// // // --- 4️⃣ Helper: Parse multipart form ---
// // const parseForm = (
// //   req: NextApiRequest
// // ): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
// //   new Promise((resolve, reject) => {
// //     const form = formidable({ multiples: false });
// //     form.parse(req, (err, fields, files) => {
// //       if (err) reject(err);
// //       else resolve({ fields, files });
// //     });
// //   });

// // // --- 5️⃣ Helper: Upload to Cloudinary ---
// // const uploadToCloudinary = (filePath: string): Promise<UploadApiResponse> => {
// //   return new Promise((resolve, reject) => {
// //     cloudinary.uploader.upload(
// //       filePath,
// //       { folder: "eshop-products", use_filename: true, unique_filename: false },
// //       (error, result) => {
// //         if (error) return reject(error);
// //         if (!result) return reject(new Error("Cloudinary upload returned no result"));
// //         resolve(result);
// //       }
// //     );
// //   });
// // };

// // // --- 6️⃣ API Handler ---
// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ success: false, message: "Method not allowed" });
// //   }

// //   try {
// //     const { fields, files } = await parseForm(req);

// //     if (!files.file) {
// //       return res.status(400).json({ success: false, message: "No file uploaded" });
// //     }

// //     const file = files.file as File;
// //     const uploadResult = await uploadToCloudinary(file.filepath);

// //     // Save to MongoDB
// //     const db = await connectDB();
// //     await db.collection("products").insertOne({
// //       name: fields.name,
// //       price: Number(fields.price),
// //       color: fields.color,
// //       colorCode: fields.colorCode,
// //       imageUrl: uploadResult.secure_url,
// //       createdAt: new Date(),
// //     });

// //     return res.status(200).json({
// //       success: true,
// //       cloudinaryUrl: uploadResult.secure_url,
// //       message: "Uploaded and saved to DB successfully",
// //     });
// //   } catch (error) {
// //     console.error("Upload API Error:", error);
// //     return res.status(500).json({ success: false, message: "Upload failed", error });
// //   }
// // }



// // 

// // import type { NextApiRequest, NextApiResponse } from "next";
// // import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// // // 1️⃣ Cloudinary Config from env vars
// // if (
// //   !process.env.CLOUDINARY_CLOUD_NAME ||
// //   !process.env.CLOUDINARY_API_KEY ||
// //   !process.env.CLOUDINARY_API_SECRET
// // ) {
// //   throw new Error(
// //     "Missing Cloudinary environment variables. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local"
// //   );
// // }

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // 2️⃣ Disable Next.js default body parsing for file uploads
// // export const config = {
// //   api: { bodyParser: false },
// // };

// // // 3️⃣ Helper: Parse multipart form
// // import formidable, { File } from "formidable";
// // import fs from "fs";

// // // Promise wrapper for formidable
// // const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
// //   new Promise((resolve, reject) => {
// //     const form = formidable({ multiples: false });
// //     form.parse(req, (err, fields, files) => {
// //       if (err) reject(err);
// //       else resolve({ fields, files });
// //     });
// //   });

// // // 4️⃣ Helper: Upload file buffer to Cloudinary
// // const uploadToCloudinary = (filePath: string): Promise<UploadApiResponse> => {
// //   return new Promise((resolve, reject) => {
// //     cloudinary.uploader.upload(
// //       filePath,
// //       { folder: "eshop-products", use_filename: true, unique_filename: false },
// //       (error, result) => {
// //         if (error) return reject(error);
// //         if (!result) return reject(new Error("Cloudinary upload returned no result"));
// //         resolve(result);
// //       }
// //     );
// //   });
// // };

// // // 5️⃣ API Handler
// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ success: false, message: "Method not allowed" });
// //   }

// //   try {
// //     console.log("Cloudinary Config at runtime:", {
// //       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //       api_key: process.env.CLOUDINARY_API_KEY,
// //       has_secret: !!process.env.CLOUDINARY_API_SECRET,
// //     });

// //     const { fields, files } = await parseForm(req);

// //     if (!files.file) {
// //       return res.status(400).json({ success: false, message: "No file uploaded" });
// //     }

// //     const file = files.file as File;

// //     console.log("Uploading file:", file.originalFilename);

// //     // Upload to Cloudinary
// //     const uploadResult = await uploadToCloudinary(file.filepath);

// //     console.log("Cloudinary upload success:", uploadResult.secure_url);

// //     // Example DB save (replace with your DB logic)
// //     // await prisma.product.create({
// //     //   data: {
// //     //     name: fields.name as string,
// //     //     price: Number(fields.price),
// //     //     images: [{ url: uploadResult.secure_url, color: fields.color, colorCode: fields.colorCode }],
// //     //   },
// //     // });

// //     return res.status(200).json({
// //       success: true,
// //       cloudinaryUrl: uploadResult.secure_url,
// //     });
// //   } catch (error) {
// //     console.error("Upload API Error:", error);
// //     return res.status(500).json({ success: false, message: "Upload failed", error });
// //   }
// // }
