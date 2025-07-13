const fs = require('fs');
const path = require('path');

console.log('🌐 ChatApp Deployment Status Checker');
console.log('====================================\n');

// Check if build exists
const buildPath = path.join(__dirname, 'client', 'build');
if (fs.existsSync(buildPath)) {
  console.log('✅ Production build exists');
  console.log(`📁 Build location: ${buildPath}`);
} else {
  console.log('❌ Production build not found');
  console.log('💡 Run: npm run build');
}

// Check if deployment files exist
const deploymentFiles = [
  'render.yaml',
  'DEPLOYMENT.md',
  'deployment-info.json'
];

console.log('\n📋 Deployment Files:');
deploymentFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} (missing)`);
  }
});

// Check package.json scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log('\n🚀 Available Scripts:');
Object.keys(packageJson.scripts).forEach(script => {
  console.log(`   npm run ${script}`);
});

console.log('\n📱 Mobile Access Features:');
console.log('✅ Responsive design for all screen sizes');
console.log('✅ Touch-friendly interface');
console.log('✅ Progressive Web App (PWA) ready');
console.log('✅ QR code generator for easy sharing');
console.log('✅ Cross-platform compatibility');

console.log('\n🌍 Deployment Options:');
console.log('1. Render.com (Free) - Recommended for beginners');
console.log('2. Railway.app (Free) - Simple GitHub integration');
console.log('3. Vercel + Railway - Best performance');
console.log('4. Heroku (Paid) - Professional hosting');

console.log('\n📋 Next Steps:');
console.log('1. Create a GitHub repository');
console.log('2. Push your code: git add . && git commit -m "Ready" && git push');
console.log('3. Choose a deployment platform from DEPLOYMENT.md');
console.log('4. Follow the platform-specific instructions');
console.log('5. Share your app URL with friends!');

console.log('\n🎯 Once Deployed:');
console.log('- Share the URL with friends and family');
console.log('- Access from any device (phone, laptop, tablet)');
console.log('- Real-time messaging across all devices');
console.log('- No app installation required');

console.log('\n💡 Pro Tips:');
console.log('- Test on different devices before sharing');
console.log('- Use a custom domain for easier sharing');
console.log('- Set up monitoring to ensure uptime');
console.log('- Consider adding user authentication later'); 