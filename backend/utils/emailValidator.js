/**
 * Validates whether the given email address belongs to an allowed provider.
 * Allowed providers: Gmail and Microsoft consumer domains.
 *
 * @param {string} email
 * @returns {boolean} True if the email is valid and allowed, false otherwise.
 */
function isValidEmailProvider(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  
  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return false;
  }

  const allowedDomains = [
    'gmail.com',
    'outlook.com',
    'outlook.in',
    'hotmail.com',
    'hotmail.in',
    'live.com',
    'msn.com'
  ];

  const domainPart = normalizedEmail.split('@')[1];

  return allowedDomains.includes(domainPart);
}

module.exports = {
  isValidEmailProvider
};
