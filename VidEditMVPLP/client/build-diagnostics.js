// Client build diagnostics script
import fs from 'fs';
import path from 'path';

console.log('=== CLIENT BUILD DIAGNOSTICS ===');

// Check Node.js version
console.log('Node.js version:', process.version);

// Check package.json dependencies

try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  console.log('\nDependency Versions:');
  console.log('React:', packageJson.dependencies.react);
  console.log('React-DOM:', packageJson.dependencies['react-dom']);
  console.log('TypeScript:', packageJson.devDependencies.typescript);
  console.log('Vite:', packageJson.devDependencies.vite);
  console.log('Lucide React:', packageJson.dependencies['lucide-react']);
} catch (e) {
  console.log('Error reading package.json:', e.message);
}

// Check for conflicting dependencies
console.log('\nChecking for conflicts with root package.json...');
try {
  const rootPackageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));
  const clientPackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  const rootDeps = rootPackageJson.dependencies || {};
  const clientDeps = clientPackageJson.dependencies || {};
  
  Object.keys(rootDeps).forEach(dep => {
    if (clientDeps[dep] && rootDeps[dep] !== clientDeps[dep]) {
      console.log(`⚠️  Version conflict for ${dep}:`);
      console.log(`   Root: ${rootDeps[dep]}`);
      console.log(`   Client: ${clientDeps[dep]}`);
    }
  });
} catch (e) {
  console.log('Could not check for conflicts:', e.message);
}

// Check TypeScript configuration
console.log('\nTypeScript Configuration Check:');
const tsConfigFiles = ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'];
tsConfigFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`${file}: ✓ Exists`);
    try {
      const config = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (config.compilerOptions?.paths) {
        console.log(`  Path aliases configured: ${Object.keys(config.compilerOptions.paths).join(', ')}`);
      }
    } catch (e) {
      console.log(`  ⚠️  Error parsing ${file}`);
    }
  } else {
    console.log(`${file}: ✗ Missing`);
  }
});

// Check Vite configuration
console.log('\nVite Configuration Check:');
if (fs.existsSync('vite.config.ts')) {
  console.log('vite.config.ts: ✓ Exists');
} else {
  console.log('vite.config.ts: ✗ Missing');
}

// Check critical source files
console.log('\nCritical Files Check:');
const criticalFiles = [
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'index.html'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`${file}: ✓ Exists`);
  } else {
    console.log(`${file}: ✗ Missing`);
  }
});

console.log('=== END CLIENT DIAGNOSTICS ===\n');