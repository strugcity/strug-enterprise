/**
 * Test script to verify Sanity connection
 * Run with: node test-sanity-connection.js
 */

const https = require('https');

const projectId = 'ktfgvv39';
const dataset = 'production';

console.log('Testing Sanity API connection...\n');

// Test 1: CDN endpoint (used by default client)
const cdnUrl = `https://${projectId}.apicdn.sanity.io/v2021-10-21/data/query/${dataset}?query=*%5B_type%20%3D%3D%20%22blogPost%22%5D%5B0%5D`;

console.log('1. Testing CDN endpoint:');
console.log(`   URL: ${cdnUrl}`);

https.get(cdnUrl, (res) => {
  console.log(`   Status: ${res.statusCode}`);

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(`   ✅ CDN endpoint working!`);
      console.log(`   Result: ${json.result ? 'Got data' : 'No data (empty dataset)'}\n`);

      // Test 2: API endpoint (used by preview client)
      testApiEndpoint();
    } catch (e) {
      console.log(`   ❌ Error parsing response: ${e.message}\n`);
    }
  });
}).on('error', (e) => {
  console.log(`   ❌ Connection failed: ${e.message}\n`);
});

function testApiEndpoint() {
  const apiUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=*%5B_type%20%3D%3D%20%22blogPost%22%5D%5B0%5D`;

  console.log('2. Testing API endpoint:');
  console.log(`   URL: ${apiUrl}`);

  https.get(apiUrl, (res) => {
    console.log(`   Status: ${res.statusCode}`);

    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(`   ✅ API endpoint working!`);
        console.log(`   Result: ${json.result ? 'Got data' : 'No data (empty dataset)'}\n`);

        console.log('✅ All Sanity connections successful!');
        console.log('\nFor GitHub Copilot allowlist, add these domains:');
        console.log('  - ktfgvv39.apicdn.sanity.io');
        console.log('  - ktfgvv39.api.sanity.io');
      } catch (e) {
        console.log(`   ❌ Error parsing response: ${e.message}\n`);
      }
    });
  }).on('error', (e) => {
    console.log(`   ❌ Connection failed: ${e.message}\n`);
  });
}
