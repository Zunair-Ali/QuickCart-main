import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Ensure this matches your data
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // <-- Fix: should be Number
  offerPrice: { type: Number, required: true }, // <-- Fix: should be Number
  image: [{ type: String }], // <-- Correct: array of URLs
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }, // Use default to auto-fill
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
