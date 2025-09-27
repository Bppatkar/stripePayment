import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductDisplay = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        // Fetching mock products from FakeStoreAPI
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.map(product => ({
                    id: product.id.toString(),
                    name: product.title,
                    price: product.price,
                    image: product.image,
                    description: product.description
                })));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    if (loading) {
        return <div className="p-4">Loading products...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h2>
                            <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                            <p className="text-xl font-semibold text-green-600 mb-4">${product.price.toFixed(2)}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDisplay;
