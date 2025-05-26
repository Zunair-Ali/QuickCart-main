import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
        product: { type: String, required: true,ref:'product' },
        quantity: { type: Number, required: true, default: 1 },
        },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true,ref:'address' }, // Reference to Address model
    status: { type: String, required:true, default: 'Order Placed' }, // e.g., Pending, Shipped, Delivered
    date: { type: Number, required:true },
    });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);
export default Order;