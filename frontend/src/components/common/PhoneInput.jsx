import React, { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const PhoneInput = ({ value, onChange, onValidationChange }) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalValue(val);
    
    // Attempt parsing (assuming international format or defaulting to IN if + not provided, but we encourage +)
    let phoneNumber;
    if (val.startsWith('+')) {
      phoneNumber = parsePhoneNumberFromString(val);
    } else {
      phoneNumber = parsePhoneNumberFromString(val, 'IN');
    }

    if (phoneNumber && phoneNumber.isValid()) {
      setError('');
      onChange(phoneNumber.number); // Returns standard E.164
      if (onValidationChange) onValidationChange(true);
    } else {
      setError('Invalid phone number format');
      onChange(val);
      if (onValidationChange) onValidationChange(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="tel"
          value={internalValue}
          onChange={handleChange}
          placeholder="+91 9876543210"
          className={`w-full p-3 rounded-lg border-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors
            ${error && internalValue.length > 5 ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500'}
            focus:outline-none`}
        />
        {/* Simple visual indicator */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          {internalValue.length > 5 && !error && (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      {error && internalValue.length > 5 && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
