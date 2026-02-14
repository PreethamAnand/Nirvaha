// ============================================
// BROWSER CONSOLE TEST SCRIPT
// ============================================
// Copy and paste this entire script into your browser console (F12 → Console tab)
// while on http://localhost:3000

console.log('🧪 Starting localStorage test...\n');

// Test 1: Check if localStorage is accessible
console.log('=== TEST 1: LocalStorage Access ===');
try {
  localStorage.setItem('test_key', 'test_value');
  const testVal = localStorage.getItem('test_key');
  localStorage.removeItem('test_key');
  if (testVal === 'test_value') {
    console.log('✅ localStorage is working');
  } else {
    console.log('❌ localStorage read/write failed');
  }
} catch (error) {
  console.log('❌ localStorage is blocked or unavailable:', error);
}

// Test 2: Check marketplace requests
console.log('\n=== TEST 2: Marketplace Requests ===');
const marketplaceKey = 'nirvaha_marketplace_requests';
const marketplaceRaw = localStorage.getItem(marketplaceKey);
console.log('Raw data:', marketplaceRaw);
if (marketplaceRaw) {
  try {
    const marketplaceData = JSON.parse(marketplaceRaw);
    console.log('✅ Found', marketplaceData.length, 'marketplace requests:');
    console.log(JSON.stringify(marketplaceData, null, 2));
  } catch (error) {
    console.log('❌ Failed to parse marketplace data:', error);
  }
} else {
  console.log('⚠️ No marketplace requests found in localStorage');
}

// Test 3: Check companion applications
console.log('\n=== TEST 3: Companion Applications ===');
const companionKey = 'nirvaha_companion_applications';
const companionRaw = localStorage.getItem(companionKey);
console.log('Raw data:', companionRaw);
if (companionRaw) {
  try {
    const companionData = JSON.parse(companionRaw);
    console.log('✅ Found', companionData.length, 'companion applications:');
    console.log(JSON.stringify(companionData, null, 2));
  } catch (error) {
    console.log('❌ Failed to parse companion data:', error);
  }
} else {
  console.log('⚠️ No companion applications found in localStorage');
}

// Test 4: List all localStorage keys
console.log('\n=== TEST 4: All localStorage Keys ===');
console.log('Total keys:', localStorage.length);
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`  ${i + 1}. ${key}`);
}

// Test 5: Add a test request
console.log('\n=== TEST 5: Create Test Request ===');
const testRequest = {
  id: 'test-' + Date.now(),
  type: 'retreat',
  status: 'pending',
  data: {
    title: 'Test Retreat from Console',
    description: 'Testing localStorage',
    price: 999,
  },
  createdAt: Date.now()
};

try {
  const existing = marketplaceRaw ? JSON.parse(marketplaceRaw) : [];
  existing.unshift(testRequest);
  localStorage.setItem(marketplaceKey, JSON.stringify(existing));
  console.log('✅ Test request added successfully!');
  console.log('Test request ID:', testRequest.id);
  console.log('Total requests now:', existing.length);
  
  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('marketplace-updated'));
  console.log('✅ Dispatched marketplace-updated event');
  
  console.log('\n🎯 ACTION REQUIRED:');
  console.log('   1. Go to http://localhost:3000/admin/marketplace');
  console.log('   2. You should see "Test Retreat from Console" in the list');
  console.log('   3. Check the console for admin panel logs');
  
} catch (error) {
  console.log('❌ Failed to add test request:', error);
}

console.log('\n✅ Test complete! Check results above.');
