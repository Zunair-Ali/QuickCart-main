import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true,ref:"user" }, // Ensure this matches your data
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }, // <-- Fix: should be Number
  offerPrice: { type: Number, required: true }, // <-- Fix: should be Number
  image: { type: Array,required:true }, // <-- Correct: array of URLs
  category: { type: String, required: true },
  date: { type: Number, required: true} // Use default to auto-fill
});

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
