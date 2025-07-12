// Final validation script to confirm all fixes
const fs = require('fs');
const path = require('path');

console.log('🔍 VALIDATING PROJECT SETUP...\n');

// Check 1: Environment variables
console.log('1. Environment Configuration:');
// Helper function to read .env file manually (avoiding dotenv dependency)
function readEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    
    const envContent = fs.readFileSync(filePath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            if (key && valueParts.length > 0) {
                envVars[key.trim()] = valueParts.join('=').trim();
            }
        }
    });
    
    return envVars;
}

// Read environment variables manually
const envVars = readEnvFile('./server/.env');
const requiredVars = ['MONGODB_URI', 'OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'NODE_ENV', 'PORT'];
requiredVars.forEach(envVar => {
  const status = envVars[envVar] ? '✅' : '❌';
  console.log(`   ${status} ${envVar}`);
});

// Check 2: Package.json files
console.log('\n2. Package Configuration:');
try {
  const serverPkg = JSON.parse(fs.readFileSync('./server/package.json', 'utf8'));
  const clientPkg = JSON.parse(fs.readFileSync('./client/package.json', 'utf8'));
  
  console.log('   ✅ Server package.json valid');
  console.log('   ✅ Client package.json valid');
  console.log(`   ✅ Nodemon configured: ${serverPkg.devDependencies?.nodemon ? 'Yes' : 'No'}`);
  console.log(`   ✅ Vite version: ${clientPkg.devDependencies?.vite}`);
} catch (e) {
  console.log('   ❌ Package.json validation failed');
}

// Check 3: Critical files
console.log('\n3. File Structure:');
const criticalFiles = [
  './server/config/database.js',
  './server/routes/index.js',
  './server/services/llmService.js',
  './client/src/main.tsx',
  './client/src/App.tsx',
  './README.md'
];

criticalFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✅' : '❌';
  console.log(`   ${status} ${file}`);
});

// Check 4: MongoDB configuration
console.log('\n4. MongoDB Configuration:');
try {
  const dbConfig = fs.readFileSync('./server/config/database.js', 'utf8');
  const hasDeprecatedOptions = dbConfig.includes('useNewUrlParser') || dbConfig.includes('useUnifiedTopology');
  console.log(`   ${hasDeprecatedOptions ? '❌' : '✅'} Deprecated options removed`);
} catch (e) {
  console.log('   ❌ Could not check database config');
}

console.log('\n🎉 SETUP VALIDATION COMPLETE!');
console.log('\n📋 NEXT STEPS:');
console.log('   1. Update API keys in server/.env with real values');
console.log('   2. Ensure MongoDB is running locally or update MONGODB_URI');
console.log('   3. Run "npm start" to launch the application');
console.log('   4. Visit http://localhost:5173 for the frontend');
console.log('   5. API server will be available at http://localhost:3000');