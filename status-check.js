const axios = require('axios');

async function checkEverything() {
    console.log('🔍 COMPREHENSIVE PROJECT STATUS CHECK');
    console.log('=' .repeat(50));
    
    // 1. Check if server is accessible
    console.log('\n1. Testing Server Accessibility...');
    try {
        const response = await axios.get('http://localhost:3000', { timeout: 5000 });
        console.log('✅ Server is accessible');
        console.log('   Response:', response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Server is not running or not accessible on port 3000');
        } else if (error.code === 'ECONNRESET') {
            console.log('⚠️  Server connection was reset - may be starting up');
        } else {
            console.log('❌ Server error:', error.message);
        }
        console.log('   Make sure the server is running with: npm run start:dev');
    }

    // 2. Check basic endpoints if server is running
    console.log('\n2. Testing Basic Endpoints...');
    
    const endpoints = [
        { url: 'http://localhost:3000/users', name: 'Users' },
        { url: 'http://localhost:3000/categories', name: 'Categories' },
        { url: 'http://localhost:3000/product', name: 'Products' }
    ];

    for (const endpoint of endpoints) {
        try {
            const response = await axios.get(endpoint.url, { timeout: 3000 });
            console.log(`✅ ${endpoint.name} endpoint working - Status: ${response.status}`);
        } catch (error) {
            if (error.response) {
                console.log(`⚠️  ${endpoint.name} endpoint responded but with error: ${error.response.status}`);
                console.log(`   Message: ${error.response.data?.message || 'No message'}`);
            } else {
                console.log(`❌ ${endpoint.name} endpoint failed: ${error.message}`);
            }
        }
    }

    console.log('\n3. File System Check...');
    const fs = require('fs');
    const path = require('path');
    
    // Check important directories
    const dirsToCheck = [
        'src',
        'src/user',
        'src/category', 
        'src/product',
        'uploads',
        'uploads/categories',
        'uploads/products'
    ];

    for (const dir of dirsToCheck) {
        if (fs.existsSync(dir)) {
            console.log(`✅ Directory exists: ${dir}`);
        } else {
            console.log(`❌ Directory missing: ${dir}`);
        }
    }

    console.log('\n4. Key Files Check...');
    const filesToCheck = [
        'src/app.module.ts',
        'src/main.ts',
        'src/user/user.module.ts',
        'src/category/category.module.ts',
        'src/product/product.module.ts',
        'package.json'
    ];

    for (const file of filesToCheck) {
        if (fs.existsSync(file)) {
            console.log(`✅ File exists: ${file}`);
        } else {
            console.log(`❌ File missing: ${file}`);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('STATUS CHECK COMPLETE');
    console.log('='.repeat(50));
}

checkEverything();