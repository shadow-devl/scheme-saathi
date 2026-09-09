// Mock database using in-memory arrays

const schemes = [
  {
    scheme_id: 'NSFDC_MICRO',
    corporation_code: 'NSFDC',
    scheme_name: 'Micro Finance Scheme',
    category: 'MICRO_FINANCE',
    min_project_cost: 0,
    max_project_cost: 140000,
    max_loan_percentage: 90,
    interest_rate_beneficiary: 6.5,
    max_repayment_months: 36,
    max_moratorium_months: 3,
    income_ceiling: 500000
  },
  {
    scheme_id: 'NSFDC_TERM',
    corporation_code: 'NSFDC',
    scheme_name: 'Term Loan Scheme',
    category: 'TERM_LOAN',
    min_project_cost: 140001,
    max_project_cost: 5000000,
    max_loan_percentage: 90,
    interest_rate_beneficiary: 8.0,
    max_repayment_months: 120,
    max_moratorium_months: 6,
    income_ceiling: 500000
  },
  {
    scheme_id: 'NSFDC_EDU',
    corporation_code: 'NSFDC',
    scheme_name: 'Educational Loan Scheme',
    category: 'EDUCATION',
    min_project_cost: 0,
    max_project_cost: 2000000,
    max_loan_percentage: 90,
    interest_rate_beneficiary: 4.0, // Subsidized for education
    max_repayment_months: 180,
    max_moratorium_months: 12,
    income_ceiling: 500000
  }
];

const partners = [
  {
    partner_id: 'SCA_01',
    partner_name: 'Delhi SC/ST Finance Corp (Branch A)',
    partner_type: 'SCA',
    district_code: 'DL_01',
    state_code: 'DL',
    latitude: 28.6139,
    longitude: 77.2090,
    allocated_budget: 2500000,
    disbursed_budget: 1000000,
    npa_percentage: 4.2, // Healthy
    is_active: 1
  },
  {
    partner_id: 'SCA_02',
    partner_name: 'Delhi SC/ST Finance Corp (Branch B)',
    partner_type: 'SCA',
    district_code: 'DL_02',
    state_code: 'DL',
    latitude: 28.6200,
    longitude: 77.2150,
    allocated_budget: 1500000,
    disbursed_budget: 500000,
    npa_percentage: 12.5, // High NPA - should be filtered
    is_active: 1
  },
  {
    partner_id: 'PSB_01',
    partner_name: 'State Bank of India (Branch C)',
    partner_type: 'PSB',
    district_code: 'DL_03',
    state_code: 'DL',
    latitude: 28.6100,
    longitude: 77.2000,
    allocated_budget: 0, // Exhausted
    disbursed_budget: 5000000,
    npa_percentage: 2.1,
    is_active: 1
  },
  {
    partner_id: 'NBFC_01',
    partner_name: 'Ujjivan Small Finance (Branch D)',
    partner_type: 'NBFC_MFI',
    district_code: 'DL_04',
    state_code: 'DL',
    latitude: 28.6300,
    longitude: 77.2200,
    allocated_budget: 5000000,
    disbursed_budget: 1000000,
    npa_percentage: 3.5, // Healthy
    is_active: 1
  }
];

const applications = [];

module.exports = {
  schemes,
  partners,
  applications
};
