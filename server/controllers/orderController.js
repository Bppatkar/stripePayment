import Order from '../models/orderModel.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
    try {
        const { products, amount, transactionId, address, email } = req.body;
        const newOrder = new Order({
            products, amount, transactionId, address, email
        });
        await newOrder.save();
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error while creating order" });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error while getting orders" });
    }
};

const createCheckoutSession = async (req, res) => {
    try {
        const { products, amount, address, email } = req.body;

        // Create order with pending status
        const newOrder = new Order({
            products,
            amount,
            transactionId: '', // Will update after session creation
            address,
            email,
            status: 'Pending'
        });
        await newOrder.save();

        // Create line items for Stripe
        const lineItems = products.map(product => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name,
                },
                unit_amount: Math.round(product.price * 100), // Stripe expects cents
            },
            quantity: product.quantity,
        }));

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: {
                orderId: newOrder._id.toString(),
            },
        });

        // Update order with transactionId and paymentIntentId
        newOrder.transactionId = session.id;
        newOrder.paymentIntentId = session.payment_intent;
        await newOrder.save();

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating checkout session" });
    }
};

const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const orderId = session.metadata.orderId;
            await Order.findByIdAndUpdate(orderId, { status: 'Paid' });
            break;
        case 'payment_intent.payment_failed':
            const paymentIntent = event.data.object;
            await Order.findOneAndUpdate({ paymentIntentId: paymentIntent.id }, { status: 'Failed' });
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};

export { createOrder, getOrders, createCheckoutSession, handleWebhook };
