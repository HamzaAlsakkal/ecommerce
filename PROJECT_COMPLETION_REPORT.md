# E-Commerce API Project

## تعليمات الأستاذ (Teacher's Instructions)

هذا المشروع تم إنجازه حسب تعليمات الأستاذ:

1. ✅ **قراءة ومراجعة أول 3 سلايدات** - تم إنجاز API كامل لنظام التجارة الإلكترونية
2. ✅ **إكمال جدول product_images** - تم إنشاء الجدول حسب المواصفات المطلوبة
3. ✅ **تشغيل السيرفر** - السيرفر يعمل على المنفذ 3000
4. ✅ **اختبار جميع endpoints** - تم إنشاء ملف اختبار شامل
5. ✅ **إكمال الكود** - الكود مكتمل وجاهز للتسليم

## Project Structure

```
src/
├── user/           # User management module
├── category/       # Category management module
├── product/        # Product management module
└── app.module.ts   # Main application module
```

## Database Schema

### Users Table
- id (Primary Key)
- name
- email (unique)
- password (hashed with bcrypt)
- role (SUPER_ADMIN, ADMIN, CUSTOMER)
- created_at, updated_at

### Categories Table
- id (Primary Key)
- name (unique)
- description
- image
- created_at, updated_at

### Products Table
- id (Primary Key)
- name (unique)
- description
- price (decimal)
- stock (integer)
- image
- category_id (Foreign Key)
- created_at, updated_at

### Product_Images Table ✅ (حسب مطلب الأستاذ)
```sql
product_images (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    alt_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
```

## API Endpoints

### 👤 User Endpoints
- `POST /users` - Create user
- `GET /users` - Get all users (with pagination)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### 📁 Category Endpoints
- `POST /categories` - Create category (with image upload)
- `GET /categories` - Get all categories (with pagination)
- `GET /categories/:id` - Get category by ID
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### 🛍️ Product Endpoints
- `POST /product` - Create product (with image upload)
- `GET /product` - Get all products (with pagination)
- `GET /product/:id` - Get product by ID
- `PATCH /product/:id` - Update product
- `DELETE /product/:id` - Delete product

## Features Implemented

✅ **TypeORM Integration** - Database ORM with PostgreSQL
✅ **File Upload** - Multer integration for image uploads
✅ **Validation** - Class-validator for input validation
✅ **Pagination** - Offset/limit pagination for all list endpoints
✅ **Password Hashing** - bcrypt for secure password storage
✅ **Error Handling** - Proper HTTP status codes and error messages
✅ **Static File Serving** - Uploaded images accessible via URL

## How to Run

1. **Install Dependencies:**
```bash
npm install
```

2. **Start the Server:**
```bash
npm run start:dev
```

3. **Run Tests:**
```bash
node test-all-endpoints.js
```

## Database Configuration

Update `src/app.module.ts` with your PostgreSQL credentials:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Admin',
  database: 'ecommerce_Database',
  autoLoadEntities: true,
  synchronize: true,
})
```

## File Upload Structure

```
uploads/
├── categories/     # Category images
└── products/       # Product images
```

## Testing

The project includes comprehensive testing:
- All CRUD operations for Users, Categories, and Products
- File upload functionality
- Pagination testing
- Error handling validation

## Server Status

🟢 **Server Running**: http://localhost:3000
🔗 **API Documentation**: All endpoints tested and working
📤 **File Uploads**: Configured and functional
📊 **Database**: PostgreSQL connected and synchronized

---

**تم إنجاز المشروع حسب متطلبات الأستاذ - Project completed according to teacher's requirements** ✅