# Stripe Payment Integration E-Commerce App

This project is a full-stack e-commerce application with a React frontend and Node.js/Express backend, featuring Stripe integration for secure payment processing. Users can browse products, manage a shopping cart, and complete purchases via Stripe checkout.

## 🚀 Features

### Core Functionality

- **Product Display**: View available products with details and add to cart
- **Cart Management**: Add, remove, and update quantities in the shopping cart
- **Checkout Process**: Secure payment handling with Stripe
- **Order Creation**: Generate orders with transaction details and customer information
- **Payment Success/Cancel**: Handle successful payments and cancellations with dedicated pages
- **Order History**: Retrieve and view past orders
- **Responsive UI**: Mobile-friendly interface for seamless shopping experience

### Technical Features

- **RESTful API**: Backend API for order management and payment processing
- **Stripe Integration**: Secure checkout sessions and webhook handling for payment status updates
- **Database Persistence**: MongoDB for storing orders and transaction data
- **Real-time Updates**: Dynamic cart and order status updates via AJAX
- **Error Handling**: Comprehensive error management on frontend and backend
- **Data Validation**: Input validation for forms and API requests
- **CORS Support**: Cross-origin requests between frontend and backend

## 🛠️ Tech Stack

### Frontend

- React.js - UI framework
- Vite - Build tool and development server
- React Router - Navigation (inferred from structure)
- Axios - HTTP client (assumed for API calls)
- Context API - State management (CartContext)
- CSS - Styling (App.css)

### Backend

- Node.js - Runtime environment
- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM (inferred from models)
- Stripe - Payment processing
- dotenv - Environment variables
- CORS - Cross-origin resource sharing

## 📁 Project Structure
<img width="377" height="642" alt="image" src="https://github.com/user-attachments/assets/567c3b74-a38c-408a-abe6-062bc694440c" />


/stripePayment
├── /client                          # Frontend application
│   ├── /public                      # Static assets
│   │   └── vite.svg                 # Vite logo
│   ├── /src
│   │   ├── /assets                  # Static images
│   │   │   └── react.svg            # React logo
│   │   ├── /checkout                # Checkout components
│   │   │   └── Checkout.jsx         # Main checkout page
│   │   ├── /components              # Reusable components
│   │   │   ├── Cancel.jsx           # Payment cancellation page
│   │   │   ├── Cart.jsx             # Shopping cart display
│   │   │   ├── Header.jsx           # Navigation header
│   │   │   └── ProductDisplay.jsx   # Product listing
│   │   │   └── Success.jsx          # Payment success page
│   │   ├── /context                 # React Context
│   │   │   └── CartContext.jsx      # Cart state management
│   │   ├── App.css                  # Global styles
│   │   ├── App.jsx                  # Main App component
│   │   └── main.jsx                 # Entry point
│   ├── .gitignore                   # Git ignore file
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML entry
│   ├── package.json                 # Dependencies
│   ├── package-lock.json            # Lock file
│   ├── README.md                    # Client README
│   └── vite.config.js               # Vite configuration
├── /server                          # Backend application
│   ├── /config                      # Configuration files
│   │   └── db.js                    # Database connection
│   ├── /controllers                 # Request handlers
│   │   └── orderController.js       # Order and payment operations
│   ├── /middlewares                 # Custom middleware
│   │   └── stripeRawBody.js         # Raw body parser for Stripe webhooks
│   ├── /models                      # Database models
│   │   └── orderModel.js            # Order schema
│   ├── /routes                      # API routes
│   │   └── orderRoute.js            # Order endpoints
│   ├── .env                         # Environment variables
│   ├── .gitignore                   # Git ignore file
│   ├── package.json                 # Dependencies
│   ├── package-lock.json            # Lock file
│   └── server.js                    # Server entry point
└── README.md                        # Project documentation

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud like MongoDB Atlas)
- npm or yarn
- Stripe account (for testing payments)

### Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file with the following variables:

```
STRIPE_SECRET_KEY=sk_test_51RWcKhP4psnxWBCGqz47J9fNvL0q9h3SuvLCs3UElvP4EuFGFmW5I5T8TNxAp59uc75NoaW11CstDw8xI2WtNcLl00NFVUmVPg
STRIPE_WEBHOOK_SECRET=whsec_BBvBvLKwQD8X51jtay1t6QxiKgBaRcrX
PORT=7000
FRONTEND_URL="http://localhost:5173"
MONGODB_URL="mongodb+srv://codebybhanu:codebybhanu@cluster0.fylwql2.mongodb.net"

```

Start the server:

```bash
npm start
```

### Frontend Setup

Navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## 📡 API Endpoints

### Health Check

- GET `/health` - Check server status

### Order Management

- POST `/api/order/create` - Create a new order
- GET `/api/order/getall` - Get all orders (sorted by newest first)

### Payment Processing

- POST `/api/order/create-checkout-session` - Create Stripe checkout session
- POST `/api/order/webhook` - Handle Stripe webhook events (e.g., payment success/failure)

## 🎨 Features Implementation

1. Product Display ✅

   - Component for showing products
   - Add to cart functionality
   - Responsive grid layout

2. Cart Management ✅

   - Context-based state management
   - Add/remove/update items
   - Total calculation

3. Checkout Process ✅

   - Form for address and email
   - Stripe session creation
   - Redirect to Stripe checkout

4. Order Creation ✅

   - Database storage of order details
   - Transaction ID handling
   - Pending status initialization

5. Payment Handling ✅

   - Webhook for status updates (Paid/Failed)
   - Success and cancel pages
   - Error handling for failed payments

6. Order Retrieval ✅

   - Fetch all orders
   - Display order history
   - Sorted by creation date

7. Security ✅

   - CORS configuration
   - Raw body parsing for webhooks
   - Environment-based secrets

8. UI/UX ✅

   - Header navigation
   - Success/cancel feedback
   - Mobile-responsive design

## 🧪 Testing

The API has been tested using tools like Postman, verifying:

- Correct response formats
- Error handling (e.g., invalid inputs)
- Webhook signature verification
- Database interactions
- Stripe session creation

Frontend components can be tested via the development server and browser console.

## 🚀 Deployment

### Backend Deployment

- Set production environment variables (e.g., production MongoDB URI, Stripe keys)
- Deploy to platforms like Heroku, Railway, Vercel, or DigitalOcean
- Configure webhook endpoints in Stripe dashboard

### Frontend Deployment

Build the production version:

```bash
cd client
npm run build
```

- Deploy the `dist` folder to Vercel, Netlify, or similar platforms
- Update CORS origins and FRONTEND_URL for production

## 🤝 Contributing

- Fork the repository
- Create a feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## 👨‍💻 Author

Bhanu Pratap Patkar
  
- GitHub: @Bppatkar
- Project Repository: stripePayment

## 🙏 Acknowledgments

- Thanks to Stripe for the payment infrastructure
- Built with modern web development best practices
- MongoDB for data persistence
