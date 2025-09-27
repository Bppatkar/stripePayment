import { useCart } from '../context/CartContext';
import { useState } from 'react';

const Cart = ({ onBack }) => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleProceedToCheckout = async () => {
        if (!email || !address) {
            alert('Email and address are mandatory');
            return;
        }
        const products = cart.map(item => ({
            ...item,
            quantity: item.quantity
        }));
        try {
            const response = await fetch('http://localhost:7000/api/order/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products,
                    amount: total,
                    address,
                    email,
                }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Error creating checkout session');
            }
        } catch (error) {
            console.error(error);
            alert('Error');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <button onClick={onBack} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <div className="space-y-4 mb-6">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-16 border rounded px-2 py-1"
                            />
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t pt-4">
                <h3 className="text-xl font-bold mb-2">Total: ${total.toFixed(2)}</h3>
                <div className="space-y-2 mb-4">
                    <input
                        type="email"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address *"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <button
                    onClick={handleProceedToCheckout}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
