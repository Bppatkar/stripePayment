import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Success = ({ sessionId }) => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    const handleContinueShopping = () => {
        navigate('/');
    };

    return (
        <div className="p-4 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-lg mb-4">Your payment was successful. Order details will be emailed to you.</p>
            <p className="text-sm text-gray-600 mb-4">Session ID: {sessionId}</p>
            <button onClick={handleContinueShopping} className="bg-blue-500 text-white px-4 py-2 rounded">
                Continue Shopping
            </button>
        </div>
    );
};

export default Success;
