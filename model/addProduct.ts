import mongoose, { Schema } from "mongoose";

const addProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    colorCode: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", addProductSchema);
