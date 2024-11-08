# Shopping App

A full-featured e-commerce application built with the MERN stack (MongoDB, Express.js, React, and Node.js). This application provides a shopping platform where users can browse products, add items to their cart, and securely checkout.

## Table of Contents

- [Features](#Features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Technologies Used](#tech-stack)
- [Future Enhancements](#future-enhancements)
- [Authors](#authors)

## Features

- User Authentication: Register, login, manage your profile, add multiple addresses and social logins.
- Product Management: Browse, filter and search products with details including price, description, rating and images and pagination with limit upto 10 items.
- Wishlist Functionality: Add or remove items and move the item to cart.
- Cart Functionality: Add or remove items, view the cart, and calculate total.
- Order Management: Place orders, view order history, and track orders.
- Review Functionality: Add reviews and assign ratings for the "Delivered" product,display aggregated rating and user feedback for the product.
- Responsive Design: Compatible with desktop and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a hosted instance)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kirtimittal/Shopping.git
   cd shopping

2. **Install dependencies for backend**:
    ```
    cd backend
    npm install

3. **Install dependencies for frontend**:
    ```
    cd frontend
    npm install

4. **Environment Variables**:
   Create a .env file in the backend folder with the following:

    ``` 
    PORT=4000
    atlasUser=sa
    atlasPassword=kirti123
    GOOGLE_CLIENT_ID=229313699502-aagqig7sm0efn74vle83nub6r7oeo3it.apps.googleusercontent.com
    SECRET_KEY=MYSECRETKEY

5. **Run the application**:
     Open two terminal windows:

   - **Backend:**
     
        ``` 
        cd backend
        npm start

   - **Frontend:**
     
        ```
        cd frontend
        npm start

6. **Access the app**:

    Visit the app at http://localhost:3000 for the frontend.
    The backend server runs on http://localhost:4000.

## Folder Structure

``` plaintext
shopping/
├── backend/
│   ├── db/               # Database connection
│   ├── controllers/      # Controllers for handling business logic
│   ├── utils/            # Authentication and error handling middleware
│   ├── models/           # Mongoose models for database schema
│   ├── routes/           # API routes
│   ├── app.js            # Entry point for backend server
|   └── package.json      # Backend dependencies
│
└── frontend/
    ├── public/           # Static files
    ├── src/
    │   ├── components/   # Reusable components
    |   ├── css/          # Style sheets
    |   ├── images/       # Images for Website 
    |   ├── screenshots/  # Screenshots for different pages of Website
    │   ├── store/        # Actions, Reducers and store configuration
    │   ├── App.js        # Main App component
    |   └── index.js      # Entry point for frontend
    └── package.json      # Frontend dependencies
```

## API Endpoints

### User Routes

- POST /api/user/signup - Register a new user.
- POST /api/user/login - Login and get a token.
- POST /api/user/update - Update user profile.
- POST /api/user/google-login - Login with google and get a token.
- POST /api/user/logout - Logout a user.
  
### Product Routes

- GET /products/:category/:subcatgory/:searchInput - Get all products by category and subcategory or by search field.
- POST /products - Add product.
- GET /brands/:parentCat/:category - Get all brands by category and subcategory.
- GET /getProductsByBrand/:parentCat/:category/:brands/:searchInput - Get all products by brand.
- GET /search/:searchString - Get all products by search Input.
- GET /product/:id - Get a single product by ID.

 
### Category Routes

- GET /api/category/:parentCategory - Get subcategories by parent Category.
- GET /api/category/ - Get parent category.
- POST /api/category/add - Add category.

### Wishlist Routes

- POST /api/wishlist/ - Add item to wishlist.
- GET /api/wishlist/:userid - Get user wishlist.
- DELETE /api/wishlist - Remove item from wishlist.
  
### Cart Routes

- POST /api/cart/add - Add item to cart.
- DELETE /api/cart/delete - Remove item from cart.
- GET /api/cart/getItems/:userid - Get user products from cart.
- POST /api/cart/empty - Empty cart.

### Order Routes

- GET /api/orders/:userid - Get all orders of a user.
- POST /api/orders/ - Add order.
- GET /api/orders/:id - Get single order details by Id.
- GET /api/orders/:userid/search/:input - Get all orders by searchInput.
- GET /api/orders/:userid/filter/:status - Get all orders by status.
  
### Review Routes

- POST /api/reviews - Add a new review.
- GET /api/reviews/:productid/:userid - Get review.

## Screenshots

### Home page
![Homepage of the app](./src/Screenshots/home.png)

### Product Page
![Product page of the app](./src/Screenshots/products.png)

### Product Detail Page
![Product Detail page of the app](./src/Screenshots/Product_detail.png)

### Login Page
![Login page of the app](./src/Screenshots/Login.png)

### SignUp Page
![SignUp page](./src/Screenshots/Signup.png)

### Update Profile Page
![Update Profile page](./src/Screenshots/Update_Profile.png)

### Wishlist Page
![Wishlist page of the app](./src/Screenshots/Wishlist.png)

### Cart Page
![Shopping cart page](./src/Screenshots/Cart.png)

### Place Order Page
![Place Order page](./src/Screenshots/Confirm_Address.png)

### Orders Page
![Orders page](./src/Screenshots/Orders.png)

### Order Detail Page
![Order Detail page](./src/Screenshots/Order_Detail.png)

## Tech Stack

- **Frontend**: React, Redux for state management, Bootstrap for UI components,   Toastify for notifications .
- **Backend**: Node.js, Express.js, MongoDB for database.
- **Authentication**: JSON Web Token (JWT) for secure authentication.

## Future Enhancements

- Integrate payment API Gateway.
- Track Live Order Status.

## Authors
Developed by Kirti Gupta.

Feel free to open an issue or submit a pull request if you'd like to contribute!