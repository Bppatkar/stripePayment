import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import orderRoute from './routes/orderRoute.js';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Webhook endpoint needs raw body
app.use('/api/order/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

app.get("/health", (req, res) => {
    res.send("Server is running");
});
app.use('/api/order', orderRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
