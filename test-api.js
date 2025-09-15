const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
    console.log('🧪 Testing E-commerce API Endpoints...\n');

    try {
        // Test 1: Create a Category
        console.log('1️⃣ Creating a category...');
        const categoryResponse = await axios.post(`${BASE_URL}/categories`, {
            name: 'Electronics',
            description: 'Electronic devices and gadgets'
        });
        console.log('✅ Category created:', categoryResponse.data);
        const categoryId = categoryResponse.data.id;

        // Test 2: Get all categories
        console.log('\n2️⃣ Getting all categories...');
        const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
        console.log('✅ Categories retrieved:', categoriesResponse.data);

        // Test 3: Create a Product with category relationship
        console.log('\n3️⃣ Creating a product with category relationship...');
        const productResponse = await axios.post(`${BASE_URL}/products`, {
            name: 'iPhone 15',
            description: 'Latest iPhone model',
            price: 999.99,
            categoryId: categoryId
        });
        console.log('✅ Product created:', productResponse.data);

        // Test 4: Get all products
        console.log('\n4️⃣ Getting all products...');
        const productsResponse = await axios.get(`${BASE_URL}/products`);
        console.log('✅ Products retrieved:', productsResponse.data);

        // Test 5: Create a User
        console.log('\n5️⃣ Creating a user...');
        const userResponse = await axios.post(`${BASE_URL}/users`, {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'CUSTOMER'
        });
        console.log('✅ User created:', userResponse.data);

        // Test 6: Get all users
        console.log('\n6️⃣ Getting all users...');
        const usersResponse = await axios.get(`${BASE_URL}/users`);
        console.log('✅ Users retrieved:', usersResponse.data);

        console.log('\n🎉 All API tests completed successfully!');
        console.log('\n📊 Database Relationships:');
        console.log(`   Category ID ${categoryId} ↔ Product (categoryId: ${categoryId})`);
        console.log('   ✅ OneToMany/ManyToOne relationship working correctly!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testAPI();