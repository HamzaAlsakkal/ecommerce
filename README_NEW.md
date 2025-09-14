# E-Commerce NestJS API

A modern e-commerce backend API built with NestJS, TypeORM, and PostgreSQL.

## 🚀 Features

- **User Management**: Complete CRUD operations for users with role-based access
- **Authentication**: Secure password hashing with bcrypt
- **Database**: PostgreSQL integration with TypeORM
- **Validation**: Input validation using class-validator
- **Security**: Global validation pipes and input sanitization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

## ⚡ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd e_comerse
```

2. **Install dependencies**
```bash
npm install
```

3. **Database Setup**
   - Create a PostgreSQL database
   - Update database credentials in `src/app.module.ts`
   
4. **Environment Configuration**
   - Create a `.env` file in the root directory
   - Add your database configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=your_database_name
   ```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Watch mode
npm run start
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a new user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Example Request Bodies

**Create User (POST /users):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Update User (PUT /users/:id):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

## 🗄️ Database Schema

### User Entity
- `id`: Primary key (auto-generated)
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `role`: User role (super_admin, admin, customer)
- `createdAt`: Timestamp when user was created
- `updatedAt`: Timestamp when user was last updated

## 🛡️ Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **Input Validation**: All inputs are validated using class-validator
- **Email Uniqueness**: Prevents duplicate email addresses
- **Role-based Access**: Support for different user roles

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [class-validator](https://github.com/typestack/class-validator) - Validation decorators
- [class-transformer](https://github.com/typestack/class-transformer) - Object transformation

## 🚀 Future Enhancements

- [ ] JWT Authentication
- [ ] Products Management
- [ ] Categories Management
- [ ] Shopping Cart
- [ ] Order Management
- [ ] Payment Integration
- [ ] File Upload for Product Images
- [ ] API Documentation with Swagger
- [ ] Rate Limiting
- [ ] Caching with Redis

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ using NestJS

---

**Happy Coding! 🎉**
