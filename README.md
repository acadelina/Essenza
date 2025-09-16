# ESSENZA - Perfume E-commerce Platform
<p align="center">
  <img width="748"  alt="{1685B41A-C0E4-4FA3-85C1-68EF13E53E79}" src="https://github.com/user-attachments/assets/5961b204-62a1-4874-a2d0-5e78a44187fa" />
</p>

A full-stack e-commerce platform for perfumes built with Next.js frontend and Node.js backend. Features user authentication, shopping cart functionality, admin panel, and order management.

### Customer Features
  - **Product Catalog:** Browse perfumes by category (Men's, Women's, All Products)
  - **Advanced Filtering:** Filter by brand, price range, and fragrance notes
  - **Search Functionality:** Real-time search with dropdown suggestions
  - **Product Variants:** Multiple sizes and prices for each perfume
  - **Shopping Cart:** Add/remove items, adjust quantities
  - **User Authentication:** Register, login, and profile management
  - **Order Tracking:** View order history and status


### Admin Features
  - **Product Management:** Add, edit, delete products and variants
  - **Inventory Tracking:** Monitor stock levels with visual indicators
  - **Order Management:** View and update order status
  - **Best Deals:** Select featured products for homepage

## Project structure

```
essenza/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/              # Route handlers
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── isAdmin.js           # Admin authorization
│   ├── models/                   # Sequelize models
│   ├── routes/                   # API routes
│   └── server.js                 # Entry point
└── frontend/
    ├── components/
    │   ├── Admin/                # Admin panel components
    │   ├── AllProductsPages/     # Product listing components
    │   ├── Cart/                 # Shopping cart components
    │   ├── Layout/               # Header, Footer, Layout
    │   ├── MainPage/             # Homepage components
    │   ├── ProductPage/          # Product detail components
    │   └── Profile/              # User profile components
    ├── pages/                    # Next.js pages
    ├── styles/                   # CSS modules
    └── utils/                    # Custom hooks and utilities
```

## Setup

  ### Backend
  1. Clone the repository
  2. Install dependencies
     ```
     npm install
     ```
  3. Environment Configuration ( Create a .env file in the backend directory )
  4. Database Setup
  5. Start the server
    ```
    npm start
    ```

  ### Frontend
  1. Install dependencies
     ```
     npm install
     ```
  2. Environment Configuration
  3. Start the development server
     ```
     npm run dev
     ```


## Technologies

  ### Frontend
  - **Next.js** - React framework
  - **React Hooks** - State management
  - **CSS Modules** - Styling
  - **JWT** - Authenticaton
  
  ### Backend
  - **Node.js** - Runtime environment
  - **Express.js** - Web framework
  - **Sequelize** - ORM
  - **PostgreSQL** - Database
  - **JWT** - Authentication
  - **bcrypt** - Password hashing
  - **CORS** - Cross-origin requests


## Key Features

  ### 1. Product Browsing & Filtering
  <p align="center">
    <img width="500" alt="{12B2C8F3-E2A5-4AAA-9838-6679F41D4C19}" src="https://github.com/user-attachments/assets/7505d022-56ad-4c0c-b300-4e77e44ac59f" />
<img width="500" alt="{F7AF76AE-C27D-4D33-9C24-D240FF176B92}" src="https://github.com/user-attachments/assets/c208dab2-614c-49bc-9afb-acf3af80f13d" />

  </p>

  ### 2. Shopping Experience
  - Guest Cart: Anonymous users can shop without registration
  - Cart Persistence: Cart items saved across sessions
  - Real-time Updates: Immediate UI updates for cart operations
  <p align="center">
    <img width="500"  alt="{D261D043-20AE-458A-98F4-123E2FC04545}" src="https://github.com/user-attachments/assets/a4da415d-d3fe-4900-a922-a104f30376c3" />
    <img width="500"  alt="{33D07A92-725E-4FA8-B6E1-26EA329AD9D9}" src="https://github.com/user-attachments/assets/a756f7cb-b147-42b6-adec-a7ba32d11754" />
  </p>

  ### 3. Admin Dashboard
  - Product Oversight: Visual indicators for low stock items
  - Order Management: Status tracking with dropdown updates
  - Best Deals Curation: Select up to 3 featured products
  - Efficient product and order management

  <p align="center">
   <img width="500"  alt="{FFE23494-AA09-4890-85DB-257DB6D0E02B}" src="https://github.com/user-attachments/assets/0b18e079-f9cb-46f1-a000-b4e6a30977cd" />
  <img width="500"  alt="{CEC5B367-2BD8-414A-B62E-23E015AF7D2F}" src="https://github.com/user-attachments/assets/1435e2c3-8805-4c10-bb5e-f86650ab386b" />
  </p>
  <p align="center">
    <img width="500" alt="{A198E84B-B5DA-4B7C-BA1B-86B329E0F547}" src="https://github.com/user-attachments/assets/9e57d14d-2dbd-4dd1-9d25-6f1243c6e34d" />
    <img width="500"  alt="{706DE5AD-32EF-490E-9081-B500B94337A6}" src="https://github.com/user-attachments/assets/a7de5ca0-99a3-4fae-bd90-b6411fb2cfb7" />
  </p>

## Security Features
  - **JWT Authentication:** Secure token-based authentication
  - **Role-based Access:** Admin-only routes and features
  - **Password Hashing:** bcrypt for secure password storage
  - **Input Validation:** Server-side validation for all inputs
  - **CORS Protection:** Configured cross-origin policies
## API documentation:
  - [API.md](https://github.com/acadelina/Essenza/blob/main/backend/API.md)

## Future Improvements
  - Payment gateway integration (Stripe/PayPal)
  - Product reviews and ratings
  - Wishlist functionality
