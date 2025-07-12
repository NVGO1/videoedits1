// Startup diagnostics script
require('dotenv').config();
console.log('=== SERVER STARTUP DIAGNOSTICS ===');

// Check environment variables
console.log('Environment Variables Check:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Missing');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✓ Set' : '✗ Missing');
console.log('ANTHROPIC_API_KEY:', process.env.ANTHROPIC_API_KEY ? '✓ Set' : '✗ Missing');
console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('PORT:', process.env.PORT || '3000 (default)');

// Check dependencies
console.log('\nDependency Check:');
try {
  require('mongoose');
  console.log('mongoose: ✓ Available');
} catch (e) {
  console.log('mongoose: ✗ Missing');
}

try {
  require('express');
  console.log('express: ✓ Available');
} catch (e) {
  console.log('express: ✗ Missing');
}

try {
  require('dotenv');
  console.log('dotenv: ✓ Available');
} catch (e) {
  console.log('dotenv: ✗ Missing');
}

// Check file structure
const fs = require('fs');
const path = require('path');

console.log('\nFile Structure Check:');
const requiredFiles = [
  './config/database.js',
  './routes/index.js',
  './services/llmService.js'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`${file}: ✓ Exists`);
  } else {
    console.log(`${file}: ✗ Missing`);
  }
});

console.log('=== END DIAGNOSTICS ===\n');