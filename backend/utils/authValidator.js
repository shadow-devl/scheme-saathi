const ALLOWED_DOMAINS = [
  'gmail.com', 
  'outlook.com', 'outlook.in', 
  'hotmail.com', 'hotmail.in', 
  'live.com', 'msn.com'
];

const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const lowerEmail = email.toLowerCase().trim();
  
  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(lowerEmail)) {
    return false;
  }
  
  const domain = lowerEmail.split('@')[1];
  return ALLOWED_DOMAINS.includes(domain);
};

const validatePassword = (password) => {
  return typeof password === 'string' && password.length >= 8;
};

const ALLOWED_ROLES = ['USER', 'ENTREPRENEUR', 'INVESTOR', 'APPLICANT'];
const validateRole = (role) => ALLOWED_ROLES.includes(role);

module.exports = { validateEmail, validatePassword, validateRole, ALLOWED_DOMAINS };
