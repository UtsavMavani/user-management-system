# User Management System Frontend

A React-based user management system with role-based access control, pagination, search functionality, and user operations.

## Features

- 👥 User Authentication and Authorization
- 🔍 Search and Filter Functionality
- 📄 Pagination for User Lists
- 👮 Role-Based Access Control (Admin/Sub-Admin/User)
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- 🛠 Built with React Best Practices

## Tech Stack

- React.js
- Tailwind CSS
- Ant design

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/UtsavMavani/user-management-system.git
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```env
REACT_APP_BASE_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

## Testing Credentials

### Admin User
```
Email: admin@gmail.com
Password: password
Access: Full system access including user management and sub-admin creation
```

### Sub-Admin User
```
Email: subadmin@gmail.com
Password: password
Access: Limited administrative access, can manage regular users
```

### Regular User
```
Email: user@gmail.com
Password: password
Access: Basic user access, can view own profile
```


# User Management System Backend

A robust backend API built with Node.js, Express, and MongoDB for managing users with role-based authentication, CRUD operations, and advanced filtering capabilities.

## Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-Based Access Control (Admin/Sub-Admin/User)
- 🗄️ MongoDB Database Integration
- 📝 CRUD Operations for Users
- 🔒 Password Encryption
- 🪝 Request Validation
- 📊 Error Handling

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JSON Web Tokens (JWT)
- bcrypt
- joi

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/UtsavMavani/user-management-system.git
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://utsavmavani000:16mjyORXxIuT5d1A@practical.wqaws.mongodb.net/?retryWrites=true&w=majority&appName=practical
JWT_SECRET=jwt-secret
ACCESS_TOKEN_LIFE=24h
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
npm start
```
