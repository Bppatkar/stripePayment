import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductDisplay from './components/ProductDisplay';
import Cart from './components/Cart';
import Success from './components/Success';
import Cancel from './components/Cancel';
import './App.css';

const AppContent = () => {
    const [view, setView] = useState('products'); 
    const [sessionId, setSessionId] = useState('');
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const handleCartClick = () => setView('cart');
    const handleHomeClick = () => setView('products');
    const handleBackToProducts = () => setView('products');

    // Handle success/cancel from URL params
    useEffect(() => {
        const id = searchParams.get('session_id');
        if (id) {
            setSessionId(id);
        }
        if (location.pathname === '/success') {
            setView('success');
        } else if (location.pathname === '/cancel') {
            setView('cancel');
        } else if (location.pathname === '/') {
            setView('products');
        } else if (location.pathname === '/cart') {
            setView('cart');
        }
    }, [location, searchParams]);

    return (
        <div className="App">
            <Header onCartClick={handleCartClick} onHomeClick={handleHomeClick} />
            {view === 'products' && <ProductDisplay />}
            {view === 'cart' && <Cart onBack={handleBackToProducts} />}
            {view === 'success' && <Success sessionId={sessionId} />}
            {view === 'cancel' && <Cancel />}
        </div>
    );
};

function App() {
    return (
        <Router>
            <CartProvider>
                <Routes>
                    <Route path="/" element={<AppContent />} />
                    <Route path="/cart" element={<AppContent />} />
                    <Route path="/success" element={<AppContent />} />
                    <Route path="/cancel" element={<AppContent />} />
                </Routes>
            </CartProvider>
        </Router>
    );
}

export default App;
