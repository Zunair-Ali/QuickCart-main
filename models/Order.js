import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true,ref:'user' },
    items: [
        {
        product: { type: String, required: true,ref:'product' },
        quantity: { type: Number, required: true},
        },
    ],
    amount: { type: Number, required: true },
    address: { type: String, ref:'address', required: true }, // Reference to Address model
    status: { type: String, required:true}, // e.g., Pending, Shipped, Delivered
    date: { type: Number, required:true },
    });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);
export default Order;