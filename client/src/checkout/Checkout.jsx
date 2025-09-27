import { useState } from 'react';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const products = Array.from({ length: 10 }).map((_, index) => ({
        id: `prod${index + 1}`,
        name: `Product ${index + 1}`,
        price: 20.00,
        quantity: 1
    }));

    const handleBuyNow = async (product) => {
        if (!address || !email) {
            alert('Please enter address and email');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/order/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    products: [product],
                    amount: product.price * product.quantity,
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
        setLoading(false);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border p-2"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <div key={index} className="border p-4 rounded shadow">
                        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
                        <button
                            onClick={() => handleBuyNow(product)}
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Buy Now'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checkout;
