# Hotel Admin Dashboard

A modern, elegant admin dashboard for hotel booking management built with React, Vite, and Tailwind CSS.

## Features

- 🔐 **Authentication** - Secure login with JWT token and role-based access (Manager only)
- 📊 **Dashboard** - Overview of bookings, rooms, customers, and revenue
- 📅 **Booking Management** - View and manage all hotel bookings
- 🏨 **Room Management** - Manage room inventory and availability
- 👥 **Customer Management** - Track customer information and history
- 📈 **Reports** - Analytics and performance metrics
- ⚙️ **Settings** - Configure profile and hotel settings

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library
- **JWT Decode** - Token decoding

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a `.env` file in the root directory:
\`\`\`env
VITE_API_URL=https://localhost:7146/api
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and navigate to `http://localhost:3000`

### Default Login

Use your API credentials with Manager role to access the dashboard.

## Project Structure

\`\`\`
src/
├── api/              # API service functions
│   ├── auth.js       # Authentication API
│   └── user.js       # User API
├── assets/           # Images, logos, icons
├── components/       # Reusable components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Sidebar.jsx
│   └── Header.jsx
├── layouts/          # Layout components
│   └── DashboardLayout.jsx
├── pages/            # Page components
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Bookings.jsx
│   ├── Rooms.jsx
│   ├── Customers.jsx
│   ├── Reports.jsx
│   └── Settings.jsx
├── routes/           # Route configuration
│   ├── index.jsx
│   └── PrivateRoute.jsx
├── utils/            # Utility functions
│   ├── localStorage.js    # LocalStorage helpers
│   └── jwtDecode.js        # JWT utilities
├── App.jsx
├── main.jsx
└── index.css
\`\`\`

## Features in Detail

### Authentication Flow

1. User enters email and password on login page
2. API call to `POST /api/Auth/login` with credentials
3. Token is stored in localStorage
4. Token is decoded to check for "Manager" role
5. If authorized, user is redirected to dashboard
6. PrivateRoute guards all protected pages

### API Integration

The app is configured to work with your backend API at `https://localhost:7146/api`. All API calls include:

- Proper error handling
- JWT token in Authorization header
- Request/response logging

### Mock Data

Currently, the dashboard displays mock data for:
- Bookings
- Rooms
- Customers
- Reports

You can easily replace this with real API calls by updating the respective page components.

## Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

## Design System

### Colors

- **Primary**: `#233E8F` (Elegant blue)
- **Primary Dark**: `#1a2f6f`
- **Primary Light**: `#2d4ba8`

### Typography

- System font stack for optimal performance
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components

All components follow a consistent design language with:
- Rounded corners (8px, 12px, 16px)
- Subtle shadows
- Smooth transitions
- Hover states
- Focus states for accessibility

## License

MIT


Remove-Item -Recurse -Force node_modules,package-lock.json
npm install
