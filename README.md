FinTradeApp

A full-stack portfolio management and trading simulation app built with the MERN stack.
Users can sign up with KYC, browse investment products, buy units, track their portfolio, manage a watchlist, and view wallet balance.

Features
1. Authentication & KYC

Sign up and log in with JWT-based authentication.

During signup, users fill out a basic KYC form:

Name

Email

PAN Number

Upload a dummy ID image

User data and KYC documents are securely stored in MongoDB (file upload simulated locally or cloud).

2. Product Listing & Details

View a list of dummy investment products (stocks or mutual funds seeded in DB).

Product fields:

Name

Category

Price per unit

Key metric (e.g., P/E ratio)

Product Detail Page:

More detailed info (dummy data)

Simple chart visualization of product performance (any chart library like Chart.js or Recharts)

3. Transactions & Portfolio

Buy products:

Enter units to purchase

Deduct balance from a virtual wallet (seeded with ₹100,000)

Store transactions in DB

Portfolio Dashboard:

Total invested amount

Current value (units * price)

Returns (current value − invested)

Watchlist:

Add or remove products from watchlist

Display watchlist in portfolio

Tech Stack

Frontend: React, Tailwind CSS, React Router

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT

API Requests: Axios

Charting: Chart.js or Recharts

File Upload: Multer (simulated local storage)

Project Structure
FinTradeApp/
│
├── backend/
│   ├── Models/          # MongoDB models (User, Product, Transaction)
│   ├── Controllers/     # API logic (auth, portfolio, products, watchlist)
│   ├── Routes/          # Express routes
│   ├── app.js           # Express app
│   ├── server.js        # Server entry
│   └── .env             # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Portfolio, Products, KYC form
│   │   ├── pages/        # Login, Signup, ProductDetails
│   │   ├── api.js        # Axios instance
│   │   └── App.jsx       # Main React app
│   └── tailwind.config.js
│
├── package.json
└── README.md

Setup Instructions
1. Clone the repository
git clone https://github.com/yourusername/FinTradeApp.git
cd FinTradeApp

2. Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Run backend server:

npm run dev


API base URL: http://localhost:5000/api

3. Frontend Setup
cd frontend
npm install
npm run dev


Frontend URL: http://localhost:5173

API Documentation
Authentication Routes
Signup
POST /api/auth/signup
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "pan": "ABCDE1234F",
  "password": "password123",
  "kycDocument": <file>
}
Response:
{
  "message": "User registered successfully",
  "token": "<JWT_TOKEN>"
}

Login
POST /api/auth/login
Body:
{
  "email": "john@example.com",
  "password": "password123"
}
Response:
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}

Portfolio & Transactions
Get Portfolio
GET /api/transaction/portfolio
Headers: Authorization: Bearer <JWT_TOKEN>
Response:
{
  "wallet": 100000,
  "portfolio": [
    {
      "productId": "123",
      "productName": "Apple Stock",
      "units": 10,
      "investedAmount": 5000,
      "currentValue": 5500,
      "returns": 500
    }
  ],
  "watchlist": [
    {
      "_id": "456",
      "name": "Tesla Stock"
    }
  ]
}

Buy Product
POST /api/transaction/buy/:productId
Headers: Authorization: Bearer <JWT_TOKEN>
Body:
{
  "units": 5
}
Response:
{
  "message": "Purchase successful",
  "wallet": 95000,
  "transaction": { ...transaction details... }
}

Watchlist Routes
Add to Watchlist
POST /api/transaction/watchlist/:productId
Headers: Authorization: Bearer <JWT_TOKEN>
Response:
{
  "message": "Added to watchlist"
}

Remove from Watchlist
DELETE /api/transaction/watchlist/:productId
Headers: Authorization: Bearer <JWT_TOKEN>
Response:
{
  "message": "Removed from watchlist",
  "watchlist": [ ...updated list... ]
}

Products Routes
Get All Products
GET /api/products
Response:
{
  "data": [
    {
      "_id": "123",
      "name": "Apple Stock",
      "category": "Stocks",
      "pricePerUnit": 500,
      "peRatio": 15
    }
  ]
}

Get Product Details
GET /api/products/:productId
Response:
{
  "_id": "123",
  "name": "Apple Stock",
  "category": "Stocks",
  "pricePerUnit": 500,
  "peRatio": 15,
  "details": "Dummy detailed description",
  "chartData": [dummy chart data ]
}
