const assert = require('assert');

async function runTests() {
  const BASE_URL = 'http://localhost:3001/api';
  console.log('--- STARTING AVENIK CORE INTEGRATION TESTS ---\n');

  try {
    // 1. Register a new applicant
    console.log('1. Testing Applicant Registration...');
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Automated Test User', email: `test_${Date.now()}@example.com`, password: 'password123' })
    });
    const regData = await regRes.json();
    assert(regRes.ok, 'Registration failed');
    assert(regData.token, 'Token not received');
    const applicantToken = regData.token;
    console.log('✅ Registration successful!\n');

    // 2. Test Scheme Matching Engine
    console.log('2. Testing Smart Scheme Matcher...');
    const matchRes = await fetch(`${BASE_URL}/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: 'SC', annual_family_income: 200000, project_type: 'business', estimated_cost: 120000 })
    });
    const matchData = await matchRes.json();
    assert(matchRes.ok, 'Matching failed');
    assert(matchData.scheme.scheme_id === 'NSFDC_MICRO', 'Did not match expected Micro Finance Scheme');
    console.log(`✅ Scheme Matched: ${matchData.scheme.scheme_name} (Max Loan: ${matchData.scheme.max_loan_percentage}%)\n`);

    // 3. Test EMI Calculator
    console.log('3. Testing EMI Calculator...');
    const emiRes = await fetch(`${BASE_URL}/calculate-emi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        principal: 108000, // 90% of 120000
        annual_interest_rate: matchData.scheme.interest_rate_beneficiary,
        tenure_months: matchData.scheme.max_repayment_months,
        moratorium_months: matchData.scheme.max_moratorium_months
      })
    });
    const emiData = await emiRes.json();
    assert(emiRes.ok, 'EMI Calc failed');
    assert(emiData.emi > 0, 'EMI not calculated properly');
    console.log(`✅ EMI Calculated: ₹${emiData.emi}/month after ${emiData.moratorium_months} months moratorium\n`);

    // 4. Test Geo-Spatial Partner Locator
    console.log('4. Testing Geo-Spatial Partner Locator...');
    const partnerRes = await fetch(`${BASE_URL}/nearest-partners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude: 28.6139, longitude: 77.2090, required_loan_amount: 108000 })
    });
    const partnerData = await partnerRes.json();
    assert(partnerRes.ok, 'Partner locator failed');
    assert(partnerData.partners.length > 0, 'No partners found');
    const nearestPartner = partnerData.partners[0];
    console.log(`✅ Nearest Partner Found: ${nearestPartner.partner_name} (${nearestPartner.distance.toFixed(2)} km away)\n`);

    // 5. Submit Application (Protected Route)
    console.log('5. Testing Secure Application Submission...');
    const appRes = await fetch(`${BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${applicantToken}` },
      body: JSON.stringify({ scheme_id: matchData.scheme.scheme_id, partner_id: nearestPartner.partner_id, estimated_cost: 120000 })
    });
    const appData = await appRes.json();
    assert(appRes.ok, 'Application submission failed');
    const applicationId = appData.application.application_id;
    console.log(`✅ Application Submitted! ID: ${applicationId}\n`);

    // 6. Partner Login & Approval
    console.log('6. Testing Partner Login & Approval Flow...');
    const pLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'branchA@sca.gov', password: 'partner123' })
    });
    const pLoginData = await pLoginRes.json();
    const partnerToken = pLoginData.token;
    
    const pApproveRes = await fetch(`${BASE_URL}/partner/applications/${applicationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${partnerToken}` },
      body: JSON.stringify({ status: 'APPROVED' })
    });
    assert(pApproveRes.ok, 'Partner approval failed');
    console.log(`✅ Partner Successfully Approved Application: ${applicationId}\n`);

    // 7. Admin Dashboard Analytics
    console.log('7. Testing Admin Analytics Dashboard...');
    const aLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@avenik.com', password: 'admin123' })
    });
    const aLoginData = await aLoginRes.json();
    const adminToken = aLoginData.token;

    const statsRes = await fetch(`${BASE_URL}/admin/analytics`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const statsData = await statsRes.json();
    assert(statsRes.ok, 'Admin stats failed');
    assert(statsData.approvedApplications > 0, 'Approved application count is incorrect');
    console.log(`✅ Admin Analytics fetched successfully! Total Approved Apps: ${statsData.approvedApplications}\n`);

    console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY! The platform is 100% operational.');

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
  }
}

runTests();
