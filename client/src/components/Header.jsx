import { useCart } from '../context/CartContext';

const Header = ({ onCartClick, onHomeClick }) => {
    const { cartCount } = useCart();

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
            <button onClick={onHomeClick} className="text-xl font-bold hover:underline">
                Magnet Brains Shopping
            </button>
            <div className="relative">
                <button
                    onClick={onCartClick}
                    className="relative p-2 hover:bg-blue-700 rounded"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7.5M7 13l-1.5 7.5M17 13l1.5 7.5M17 13l4-8m-8 4h.01M16 17h.01M12 17h.01M8 17h.01M21 21H3" />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
