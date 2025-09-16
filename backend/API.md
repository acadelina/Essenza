# API Endpoints

## Authentication

  - **POST /api/users/register** - User registration
  - **POST /api/users/login** - User login

## Products

  - **GET /api/products** - Get all products
  - **GET /api/products/:id** - Get product by ID
  - **POST /api/products** - Create product (Admin)
  - **PUT /api/products/best-deals** - Update best deals (Admin)
  - **DELETE /api/products/:id** - Delete product (Admin)

## Cart

  - **POST /api/carts** - Create/get cart
  - **GET /api/carts/:id** - Get cart items
  - **POST /api/carts/add** - Add item to cart
  - **DELETE /api/carts** - Remove item from cart
  - **POST /api/carts/link** - Link guest cart to user

## Orders

  - **POST /api/orders** - Create order
  - **GET /api/orders** - Get all orders (Admin)
  - **GET /api/orders/user/:username** - Get user orders
  - **PUT /api/orders/:id** - Update order status (Admin)
