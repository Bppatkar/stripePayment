import express from 'express';
import { createOrder, getOrders, createCheckoutSession, handleWebhook } from '../controllers/orderController.js';

const router = express.Router();
router.post('/create-order', createOrder);
router.get('/get-order', getOrders);
router.post('/create-checkout-session', createCheckoutSession);
router.post('/webhook', handleWebhook);

export default router;
