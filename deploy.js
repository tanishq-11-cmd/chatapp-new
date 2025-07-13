const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 ChatApp Deployment Helper');
console.log('============================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this from the project root.');
  process.exit(1);
}

// Build the application
console.log('📦 Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if build files exist
const buildPath = path.join(__dirname, 'client', 'build');
if (!fs.existsSync(buildPath)) {
  console.error('❌ Error: Build files not found. Build may have failed.');
  process.exit(1);
}

console.log('🌐 Deployment Options:');
console.log('1. Render.com (Recommended - Free)');
console.log('2. Railway.app (Alternative - Free)');
console.log('3. Vercel + Railway (Best Performance)');
console.log('4. Manual deployment');
console.log('\n📋 Next Steps:');
console.log('1. Push your code to GitHub:');
console.log('   git add .');
console.log('   git commit -m "Ready for deployment"');
console.log('   git push origin main');
console.log('\n2. Follow the instructions in DEPLOYMENT.md');
console.log('\n3. Your app will be accessible from phones and laptops worldwide! 🌍');

// Create a simple deployment status file
const deploymentInfo = {
  lastBuild: new Date().toISOString(),
  buildPath: buildPath,
  deploymentOptions: [
    'Render.com - Free hosting with automatic deployments',
    'Railway.app - Simple deployment with GitHub integration',
    'Vercel + Railway - Best performance for frontend and backend'
  ]
};

fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
console.log('\n📄 Deployment info saved to deployment-info.json'); 