const axios = require('axios');

async function quickTest() {
    try {
        console.log('🔍 Testing server connection...');
        const response = await axios.get('http://localhost:3000');
        console.log('✅ Server is running! Response:', response.data);
        
        console.log('\n🧪 Testing a simple endpoint...');
        const usersResponse = await axios.get('http://localhost:3000/users');
        console.log('✅ Users endpoint working! Count:', usersResponse.data.count || usersResponse.data.length || 'Unknown');
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        }
    }
}

quickTest();