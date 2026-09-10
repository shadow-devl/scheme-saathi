const assert = require('assert');

async function runAuthSecurityTests() {
  const BASE_URL = 'http://localhost:3001/api';
  console.log('--- STARTING SCHEME SAATHI AUTH SECURITY TESTS ---\n');

  try {
    let passed = 0;
    let total = 0;
    const results = [];

    const test = async (name, fn) => {
      total++;
      try {
        await fn();
        console.log(`✅ PASS: ${name}`);
        results.push({ name, status: 'PASS' });
        passed++;
      } catch (err) {
        console.error(`❌ FAIL: ${name} - ${err.message}`);
        results.push({ name, status: 'FAIL', error: err.message });
      }
    };

    // 1. Email Provider Restriction
    await test('A01 Gmail registration', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `test_${Date.now()}@gmail.com`, password: 'password123', role: 'USER' })
      });
      assert(res.ok, 'Failed to register with gmail.com');
    });

    await test('A02 uppercase Gmail', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `test2_${Date.now()}@GMAIL.COM`, password: 'password123', role: 'USER' })
      });
      assert(res.ok, 'Failed to register with uppercase gmail.com');
    });

    await test('A03 Outlook registration', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `test_${Date.now()}@outlook.com`, password: 'password123', role: 'USER' })
      });
      assert(res.ok, 'Failed to register with outlook.com');
    });

    await test('A06 Yahoo rejection', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `test_${Date.now()}@yahoo.com`, password: 'password123', role: 'USER' })
      });
      assert.strictEqual(res.status, 400, 'Expected 400 for yahoo.com');
    });

    await test('A09 malformed email', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `invalid-email`, password: 'password123', role: 'USER' })
      });
      assert.strictEqual(res.status, 400, 'Expected 400 for malformed email');
    });

    // 2. Password length
    await test('A11 short password', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `test_short_${Date.now()}@gmail.com`, password: 'short', role: 'USER' })
      });
      assert.strictEqual(res.status, 400, 'Expected 400 for short password');
    });

    // 3. Role Validation
    await test('A14 invalid role', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `test_role_${Date.now()}@gmail.com`, password: 'password123', role: 'INVALID_ROLE' })
      });
      assert.strictEqual(res.status, 400, 'Expected 400 for invalid role');
    });

    await test('A15 ADMIN registration attempt', async () => {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: `test_admin_${Date.now()}@gmail.com`, password: 'password123', role: 'ADMIN' })
      });
      assert.strictEqual(res.status, 400, 'Expected 400 for ADMIN role');
    });

    // 4. Pending account login
    await test('A17 unverified login', async () => {
      const email = `test_pending_${Date.now()}@gmail.com`;
      // Register
      await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test Pending', email, password: 'password123', role: 'USER' })
      });
      
      // Attempt login
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
      });
      
      assert.strictEqual(res.status, 403, 'Expected 403 for PENDING account');
      const data = await res.json();
      assert.strictEqual(data.error, 'Please verify your email address to log in.');
    });

    console.log(`\nResults: ${passed}/${total} passed.`);
    if (passed < total) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error during tests:', error);
  }
}

runAuthSecurityTests();
