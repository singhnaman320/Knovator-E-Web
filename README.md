# E-commerce Frontend Application

A React.js e-commerce frontend application with cart management, user authentication, and order processing.

## 🚀 Features

- **User Authentication** - Login/signup with JWT tokens
- **Product Catalog** - Browse and view products
- **Shopping Cart** - Add, update, remove items with quantity controls
- **Order Management** - Place orders and view order history
- **Order Cancellation** - Custom modal for canceling orders
- **Responsive Design** - Works on desktop and mobile
- **Toast Notifications** - User feedback for actions
- **Protected Routes** - Cart and orders require authentication

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API server running (see server README)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the client root:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
client/
├── public/                 # Static assets
│   └── index.html             # Main HTML template
├── src/                   # Source code
│   ├── components/            # Reusable UI components
│   │   ├── Header.jsx            # Navigation header with user menu
│   │   ├── Footer.jsx            # Application footer
│   │   ├── ProductCard.jsx       # Product display card
│   │   ├── ProtectedRoute.jsx    # Route protection wrapper
│   │   └── CancelOrderModal.jsx  # Custom order cancellation modal
│   ├── context/              # React Context providers
│   │   ├── AuthContext.jsx       # Authentication state management
│   │   └── CartContext.jsx       # Shopping cart state management
│   ├── pages/                # Main application pages
│   │   ├── ProductListingPage.jsx # Product catalog page
│   │   ├── LoginPage.jsx         # User login form
│   │   ├── SignupPage.jsx        # User registration form
│   │   ├── CartPage.jsx          # Shopping cart and checkout
│   │   └── OrdersPage.jsx        # Order history and management
│   ├── services/             # API service layer
│   │   └── api.js                # HTTP client and API endpoints
│   ├── App.jsx               # Main application component with routing
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and Tailwind imports
├── vercel.json            # Vercel deployment configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
└── README.md              # This file
```

## 🎨 UI Components

### Header Component
- **Navigation menu** with responsive design
- **User authentication** status display
- **Profile dropdown** with user information
- **Logout functionality**

### Product Display
- **Product grid** with responsive layout
- **Product cards** with images, prices, and details
- **Add to cart** functionality with quantity selection
- **Stock status** indicators

### Shopping Cart
- **Cart items** with quantity controls (+/- buttons)
- **Real-time price** calculations
- **Remove items** functionality
- **Clear cart** option
- **Checkout form** with customer information

### Order Management
- **Order history** with detailed order information
- **Order status** tracking
- **Order cancellation** with custom modal
- **Meaningful order IDs** (KNV + YYMMDD + XXXX format)

### Custom Modals
- **Order Cancellation Modal** with confirmation
- **Loading states** and error handling
- **Toast notifications** for user feedback

## 🔐 Authentication Flow

### Login Process
1. User enters email and password
2. Frontend sends credentials to `/api/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. User redirected to homepage
6. Protected routes become accessible

### Registration Process
1. User fills registration form
2. Frontend validates input (name, email, password)
3. Data sent to `/api/auth/signup`
4. Account created and auto-login
5. User redirected to homepage

### Protected Routes
- `/cart` - Shopping cart page
- `/orders` - Order history page
- Automatic redirect to login if not authenticated

## 🛒 Shopping Cart Features

### Cart Management
- **Add to Cart** - From product catalog
- **Update Quantity** - Using +/- buttons or direct input
- **Remove Items** - Individual item removal
- **Clear Cart** - Remove all items at once
- **Persistent Storage** - Cart synced with backend

### Real-time Updates
- **Quantity changes** reflect immediately
- **Price calculations** update automatically
- **Cart badge** shows item count in header
- **Loading states** during API operations

## 📦 Order Processing

### Order Placement
1. **Cart Review** - Verify items and quantities
2. **Customer Information** - Name, email, phone
3. **Shipping Address** - Complete address details
4. **Order Confirmation** - Generate order with unique ID
5. **Cart Clearing** - Automatic cart cleanup
6. **Success Notification** - Order confirmation message

### Order Management
- **Order History** - View all past orders
- **Order Details** - Items, quantities, prices, status
- **Order Cancellation** - Cancel pending orders with reason
- **Order Status** - Track order progress

## 🎯 State Management

### AuthContext
```javascript
{
  user: Object,           // Current user information
  isAuthenticated: Boolean, // Authentication status
  login: Function,        // Login handler
  logout: Function,       // Logout handler
  loading: Boolean        // Loading state
}
```

### CartContext
```javascript
{
  cart: {
    items: Array,         // Cart items
    totalItems: Number,   // Total item count
    totalAmount: Number   // Total cart value
  },
  loading: Boolean,       // Loading state
  addToCart: Function,    // Add item to cart
  updateQuantity: Function, // Update item quantity
  removeFromCart: Function, // Remove item
  clearCart: Function,    // Clear all items
  getItemQuantity: Function, // Get quantity of specific item
  isInCart: Function      // Check if item is in cart
}
```

## 🌐 API Integration

### HTTP Client Configuration
- **Base URL** - Configurable via environment variables
- **Axios Interceptors** - Automatic token attachment
- **Error Handling** - Centralized error processing
- **Response Formatting** - Consistent API response handling

### API Endpoints Used
- **Authentication**: `/auth/login`, `/auth/signup`, `/auth/profile`
- **Products**: `/products`
- **Cart**: `/cart/*` (GET, POST, PUT, DELETE)
- **Orders**: `/orders/*` (GET, POST, PATCH)

## 🎨 Styling & Design

### Tailwind CSS
- **Utility-first** CSS framework
- **Responsive design** with mobile-first approach
- **Custom color palette** and design system
- **Component-based** styling approach

### Design Features
- **Clean, modern** interface
- **Consistent spacing** and typography
- **Hover effects** and transitions
- **Loading states** and skeletons
- **Error states** and empty states

## 📱 Responsive Design

### Breakpoints
- **Mobile** - Default (< 640px)
- **Tablet** - sm: (640px+)
- **Desktop** - md: (768px+)
- **Large Desktop** - lg: (1024px+)

### Mobile Features
- **Touch-friendly** buttons and controls
- **Collapsible navigation** menu
- **Optimized forms** for mobile input
- **Swipe gestures** support

## 🚀 Deployment

### Vercel Deployment
1. **Build Configuration** - Vite build system
2. **Environment Variables** - Set `VITE_API_BASE_URL`
3. **SPA Configuration** - `vercel.json` for client-side routing
4. **Automatic Deployments** - Git integration

### Build Process
```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration Files

### `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

### `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `tailwind.config.js`
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
}
```

## 🧪 Development

### Available Scripts
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Workflow
1. **Component Development** - Create reusable components
2. **State Management** - Use React Context for global state
3. **API Integration** - Use service layer for API calls
4. **Styling** - Apply Tailwind CSS classes
5. **Testing** - Manual testing and user feedback

## 📦 Dependencies

### Core Dependencies
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **react-hot-toast** - Toast notifications
- **lucide-react** - Icon library

### Development Dependencies
- **vite** - Build tool and dev server
- **@vitejs/plugin-react** - React plugin for Vite
- **tailwindcss** - CSS framework
- **autoprefixer** - CSS post-processor
- **postcss** - CSS processor

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Check `VITE_API_BASE_URL` in `.env`
   - Ensure backend server is running
   - Verify CORS configuration

2. **Authentication Issues**
   - Clear localStorage and cookies
   - Check JWT token expiration
   - Verify backend authentication endpoints

3. **Build Errors**
   - Clear `node_modules` and reinstall
   - Check for TypeScript errors
   - Verify all imports and exports

4. **Deployment Issues (Vercel)**
   - Ensure `vercel.json` is present
   - Check environment variables in Vercel dashboard
   - Verify build commands and output directory

## 🌟 Implemented Features

### ✅ Authentication
- User registration and login forms
- JWT token storage and management
- Protected routes for cart and orders
- User profile display in header

### ✅ Product Catalog
- Product listing page with grid layout
- Product cards with images and details
- Add to cart functionality
- Responsive design

### ✅ Shopping Cart
- Add/remove items from cart
- Quantity controls (+/- buttons)
- Real-time price calculations
- Clear entire cart option
- Checkout form with customer information

### ✅ Order Management
- Place orders with shipping details
- Order history page
- Order cancellation with custom modal
- Order ID generation (KNV + date + number format)

### ✅ UI Components
- Header with navigation and user menu
- Footer component
- Toast notifications for user feedback
- Loading states and error handling
- Responsive design with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.