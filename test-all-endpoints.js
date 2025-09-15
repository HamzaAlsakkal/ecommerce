const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

// Test data
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword123',
    role: 'CUSTOMER'
};

const testCategory = {
    name: 'Electronics',
    description: 'Electronic devices and accessories'
};

const testProduct = {
    name: 'Test Product',
    description: 'A sample product for testing',
    price: 99.99,
    stock: 50,
    categoryId: 1
};

let createdUserId, createdCategoryId, createdProductId;

async function testAllEndpoints() {
    console.log('🧪 Testing All E-commerce API Endpoints...\n');
    console.log('=' .repeat(50));

    try {
        // ================== USER ENDPOINTS ==================
        console.log('\n👤 TESTING USER ENDPOINTS');
        console.log('-'.repeat(30));

        // 1. Create User
        console.log('1️⃣ POST /users - Creating user...');
        try {
            const userResponse = await axios.post(`${BASE_URL}/users`, testUser);
            createdUserId = userResponse.data.id;
            console.log('✅ User created successfully:', userResponse.data.name);
        } catch (error) {
            console.log('❌ Create user failed:', error.response?.data?.message || error.message);
        }

        // 2. Get All Users
        console.log('2️⃣ GET /users - Getting all users...');
        try {
            const usersResponse = await axios.get(`${BASE_URL}/users`);
            console.log(`✅ Retrieved ${usersResponse.data.data?.length || usersResponse.data.length} users`);
        } catch (error) {
            console.log('❌ Get users failed:', error.response?.data?.message || error.message);
        }

        // 3. Get User by ID
        if (createdUserId) {
            console.log('3️⃣ GET /users/:id - Getting user by ID...');
            try {
                const userResponse = await axios.get(`${BASE_URL}/users/${createdUserId}`);
                console.log('✅ User retrieved:', userResponse.data.name);
            } catch (error) {
                console.log('❌ Get user by ID failed:', error.response?.data?.message || error.message);
            }

            // 4. Update User
            console.log('4️⃣ PUT /users/:id - Updating user...');
            try {
                const updateData = { name: 'Updated Test User' };
                const updateResponse = await axios.put(`${BASE_URL}/users/${createdUserId}`, updateData);
                console.log('✅ User updated successfully');
            } catch (error) {
                console.log('❌ Update user failed:', error.response?.data?.message || error.message);
            }
        }

        // ================== CATEGORY ENDPOINTS ==================
        console.log('\n📁 TESTING CATEGORY ENDPOINTS');
        console.log('-'.repeat(35));

        // 5. Create Category
        console.log('5️⃣ POST /categories - Creating category...');
        try {
            const categoryResponse = await axios.post(`${BASE_URL}/categories`, testCategory);
            createdCategoryId = categoryResponse.data.id;
            console.log('✅ Category created successfully:', categoryResponse.data.name);
        } catch (error) {
            console.log('❌ Create category failed:', error.response?.data?.message || error.message);
        }

        // 6. Get All Categories
        console.log('6️⃣ GET /categories - Getting all categories...');
        try {
            const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
            console.log(`✅ Retrieved ${categoriesResponse.data.data?.length || categoriesResponse.data.length} categories`);
        } catch (error) {
            console.log('❌ Get categories failed:', error.response?.data?.message || error.message);
        }

        // 7. Get Category by ID
        if (createdCategoryId) {
            console.log('7️⃣ GET /categories/:id - Getting category by ID...');
            try {
                const categoryResponse = await axios.get(`${BASE_URL}/categories/${createdCategoryId}`);
                console.log('✅ Category retrieved:', categoryResponse.data.name);
            } catch (error) {
                console.log('❌ Get category by ID failed:', error.response?.data?.message || error.message);
            }

            // 8. Update Category
            console.log('8️⃣ PUT /categories/:id - Updating category...');
            try {
                const updateData = { name: 'Updated Electronics', description: 'Updated description' };
                const updateResponse = await axios.put(`${BASE_URL}/categories/${createdCategoryId}`, updateData);
                console.log('✅ Category updated successfully');
            } catch (error) {
                console.log('❌ Update category failed:', error.response?.data?.message || error.message);
            }
        }

        // ================== PRODUCT ENDPOINTS ==================
        console.log('\n🛍️  TESTING PRODUCT ENDPOINTS');
        console.log('-'.repeat(32));

        // 9. Create Product
        console.log('9️⃣ POST /product - Creating product...');
        try {
            if (createdCategoryId) {
                testProduct.categoryId = createdCategoryId;
            }
            const productResponse = await axios.post(`${BASE_URL}/product`, testProduct);
            createdProductId = productResponse.data.id;
            console.log('✅ Product created successfully:', productResponse.data.name);
        } catch (error) {
            console.log('❌ Create product failed:', error.response?.data?.message || error.message);
        }

        // 10. Get All Products
        console.log('🔟 GET /product - Getting all products...');
        try {
            const productsResponse = await axios.get(`${BASE_URL}/product`);
            console.log(`✅ Retrieved ${productsResponse.data.data?.length || productsResponse.data.length} products`);
        } catch (error) {
            console.log('❌ Get products failed:', error.response?.data?.message || error.message);
        }

        // 11. Get Product by ID
        if (createdProductId) {
            console.log('1️⃣1️⃣ GET /product/:id - Getting product by ID...');
            try {
                const productResponse = await axios.get(`${BASE_URL}/product/${createdProductId}`);
                console.log('✅ Product retrieved:', productResponse.data.name);
            } catch (error) {
                console.log('❌ Get product by ID failed:', error.response?.data?.message || error.message);
            }

            // 12. Update Product
            console.log('1️⃣2️⃣ PATCH /product/:id - Updating product...');
            try {
                const updateData = { name: 'Updated Test Product', price: 149.99 };
                const updateResponse = await axios.patch(`${BASE_URL}/product/${createdProductId}`, updateData);
                console.log('✅ Product updated successfully');
            } catch (error) {
                console.log('❌ Update product failed:', error.response?.data?.message || error.message);
            }
        }

        // ================== FILE UPLOAD TESTS ==================
        console.log('\n📤 TESTING FILE UPLOAD ENDPOINTS');
        console.log('-'.repeat(38));

        // Test Category Image Upload
        console.log('1️⃣3️⃣ POST /categories (with image) - Testing category image upload...');
        try {
            const form = new FormData();
            form.append('name', 'Category with Image');
            form.append('description', 'Category created with image upload test');
            
            // Create a simple test file if it doesn't exist
            const testImagePath = path.join(__dirname, 'test-image.txt');
            if (!fs.existsSync(testImagePath)) {
                fs.writeFileSync(testImagePath, 'This is a test file for image upload');
            }
            form.append('image', fs.createReadStream(testImagePath));

            const uploadResponse = await axios.post(`${BASE_URL}/categories`, form, {
                headers: form.getHeaders()
            });
            console.log('✅ Category with image uploaded successfully');
        } catch (error) {
            console.log('❌ Category image upload failed:', error.response?.data?.message || error.message);
        }

        // Test Product Image Upload
        console.log('1️⃣4️⃣ POST /product (with image) - Testing product image upload...');
        try {
            const form = new FormData();
            form.append('name', 'Product with Image');
            form.append('description', 'Product created with image upload test');
            form.append('price', '199.99');
            form.append('stock', '25');
            if (createdCategoryId) {
                form.append('categoryId', createdCategoryId.toString());
            }
            
            const testImagePath = path.join(__dirname, 'test-image.txt');
            form.append('image', fs.createReadStream(testImagePath));

            const uploadResponse = await axios.post(`${BASE_URL}/product`, form, {
                headers: form.getHeaders()
            });
            console.log('✅ Product with image uploaded successfully');
        } catch (error) {
            console.log('❌ Product image upload failed:', error.response?.data?.message || error.message);
        }

        // ================== PAGINATION TESTS ==================
        console.log('\n📄 TESTING PAGINATION');
        console.log('-'.repeat(25));

        // Test Users Pagination
        console.log('1️⃣5️⃣ GET /users?offset=0&limit=5 - Testing users pagination...');
        try {
            const paginationResponse = await axios.get(`${BASE_URL}/users?offset=0&limit=5`);
            console.log('✅ Users pagination working');
        } catch (error) {
            console.log('❌ Users pagination failed:', error.response?.data?.message || error.message);
        }

        // Test Categories Pagination
        console.log('1️⃣6️⃣ GET /categories?offset=0&limit=5 - Testing categories pagination...');
        try {
            const paginationResponse = await axios.get(`${BASE_URL}/categories?offset=0&limit=5`);
            console.log('✅ Categories pagination working');
        } catch (error) {
            console.log('❌ Categories pagination failed:', error.response?.data?.message || error.message);
        }

        // Test Products Pagination
        console.log('1️⃣7️⃣ GET /product?offset=0&limit=5 - Testing products pagination...');
        try {
            const paginationResponse = await axios.get(`${BASE_URL}/product?offset=0&limit=5`);
            console.log('✅ Products pagination working');
        } catch (error) {
            console.log('❌ Products pagination failed:', error.response?.data?.message || error.message);
        }

        // ================== DELETE TESTS (Optional - Clean up) ==================
        console.log('\n🗑️  TESTING DELETE ENDPOINTS (CLEANUP)');
        console.log('-'.repeat(42));

        // Delete Product
        if (createdProductId) {
            console.log('1️⃣8️⃣ DELETE /product/:id - Deleting product...');
            try {
                await axios.delete(`${BASE_URL}/product/${createdProductId}`);
                console.log('✅ Product deleted successfully');
            } catch (error) {
                console.log('❌ Delete product failed:', error.response?.data?.message || error.message);
            }
        }

        // Delete Category
        if (createdCategoryId) {
            console.log('1️⃣9️⃣ DELETE /categories/:id - Deleting category...');
            try {
                await axios.delete(`${BASE_URL}/categories/${createdCategoryId}`);
                console.log('✅ Category deleted successfully');
            } catch (error) {
                console.log('❌ Delete category failed:', error.response?.data?.message || error.message);
            }
        }

        // Delete User
        if (createdUserId) {
            console.log('2️⃣0️⃣ DELETE /users/:id - Deleting user...');
            try {
                await axios.delete(`${BASE_URL}/users/${createdUserId}`);
                console.log('✅ User deleted successfully');
            } catch (error) {
                console.log('❌ Delete user failed:', error.response?.data?.message || error.message);
            }
        }

        console.log('\n' + '='.repeat(50));
        console.log('🎉 ALL ENDPOINT TESTS COMPLETED!');
        console.log('='.repeat(50));

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Function to check if server is running
async function checkServerStatus() {
    try {
        console.log('🔍 Checking if server is running...');
        await axios.get(`${BASE_URL}`);
        console.log('✅ Server is running at ' + BASE_URL);
        return true;
    } catch (error) {
        console.log('❌ Server is not running. Please start the server first with: npm run start:dev');
        return false;
    }
}

// Main execution
async function main() {
    const isServerRunning = await checkServerStatus();
    if (isServerRunning) {
        await testAllEndpoints();
    }
}

main();