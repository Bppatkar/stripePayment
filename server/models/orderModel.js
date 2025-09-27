import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  amount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  paymentIntentId: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
},{timestamps:true})

const Order = mongoose.model('Order', orderSchema);
export default Order;
