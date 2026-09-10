import React, { useState } from 'react';

const OTPVerificationModal = ({ isOpen, onClose, onVerify, phoneNumber }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    
    try {
      await onVerify(otp);
      setOtp('');
      onClose();
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Phone</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a 6-digit verification code to <span className="font-semibold">{phoneNumber}</span>.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                maxLength="6"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-3xl tracking-[1em] p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isVerifying || otp.length !== 6}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isVerifying ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;
