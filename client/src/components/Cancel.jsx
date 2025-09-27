const Cancel = () => {
    return (
        <div className="p-4 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
            <p className="text-lg mb-4">Your payment could not be processed. Please try again.</p>
            <button onClick={() => window.location.href = '/'} className="bg-blue-500 text-white px-4 py-2 rounded">
                Try Again
            </button>
        </div>
    );
};

export default Cancel;
