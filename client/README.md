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