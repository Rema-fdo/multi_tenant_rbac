# Multi-Tenant RBAC System

A Node.js/Express API implementing multi-tenant Role-Based Access Control (RBAC) with JWT authentication.

## Features

- Multi-tenant architecture
- Role-based access control (Admin, User roles)
- JWT authentication with refresh tokens
- Super Admin functionality
- Swagger API documentation
- MySQL database with Sequelize ORM

## Prerequisites

- Node.js
- MySQL
- npm/yarn/pnpm

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
PORT=5000
```

4. Run migrations:
```bash
npx sequelize-cli db:migrate
```

5. Seed super admin:
```bash
npx sequelize-cli db:seed:all
```

6. Start server:
```bash
npm start
```

## API Documentation

Access Swagger docs at: `http://localhost:5000/api-docs`

### Key Endpoints

#### Authentication
- POST `/auth/login` - Login user
- POST `/auth/refresh-token` - Refresh access token

#### Users
- POST `/user` - Create user
- GET `/users` - List users (tenant-specific)
- GET `/profile` - Get own profile
- GET `/profile/:id` - Get user profile by ID

#### Tenants
- POST `/tenant` - Create tenant
- POST `/tenant/:id/access` - Manage tenant access

#### Super Admin
- POST `/admin` - Create super admin

## Authentication

The API uses JWT tokens for authentication:
- Access token in Authorization header: `Bearer <token>`
- Tenant ID in header: `TenantId: <id>` (for tenant-specific operations)

## Models

- User: Basic user with tenant association
- Tenant: Organization/company unit
- SuperAdmin: System-wide administrator

## Security Features

- Password hashing with bcrypt
- Per-tenant signing secrets
- Role-based authorization middleware
- Refresh token rotation