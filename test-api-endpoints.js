#!/usr/bin/env node

const BASE_URL = 'http://localhost:3000/api';

const endpoints = [
  'beginner',
  'basic',
  'intermediate',
  'advanced',
  'expert',
  'courseData'
];

async function testEndpoint(endpoint) {
  console.log(`\n📍 Testing /${endpoint}`);
  console.log('='.repeat(50));
  
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`📊 Response has 'result' field: ${data.result !== undefined}`);
    
    if (data.result) {
      console.log(`📦 Number of items: ${Array.isArray(data.result) ? data.result.length : 'Not an array'}`);
      
      if (Array.isArray(data.result) && data.result.length > 0) {
        const firstItem = data.result[0];
        console.log(`🔍 First item structure:`);
        console.log(`   - Fields: ${Object.keys(firstItem).join(', ')}`);
        
        // Special handling for different endpoints
        if (endpoint === 'courseData') {
          console.log(`   - Course Name: ${firstItem.course_name || 'N/A'}`);
          console.log(`   - Instructor: ${firstItem.instructor || 'N/A'}`);
        } else if (firstItem.questions && Array.isArray(firstItem.questions)) {
          console.log(`   - Number of questions: ${firstItem.questions.length}`);
          if (firstItem.questions.length > 0) {
            console.log(`   - Sample question: "${firstItem.questions[0][0]}"`);
          }
        } else if (firstItem.question) {
          console.log(`   - Question: "${firstItem.question}"`);
          console.log(`   - Answer: "${firstItem.answer}"`);
        }
      }
    } else if (data.error) {
      console.log(`❌ Error: ${data.error}`);
      if (data.details) {
        console.log(`   Details: ${data.details}`);
      }
    }
    
  } catch (error) {
    console.log(`❌ Failed to fetch: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Starting API Endpoint Tests');
  console.log('================================\n');
  console.log(`Testing ${endpoints.length} endpoints...\n`);
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
  }
  
  console.log('\n\n✅ All tests completed!');
}

// Run the tests
runTests().catch(console.error);
