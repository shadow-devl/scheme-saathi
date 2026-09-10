import React, { useState, useEffect } from 'react';
import PhoneInput from '../components/common/PhoneInput';
import OTPVerificationModal from '../components/common/OTPVerificationModal';

const CommunicationPreferences = () => {
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [channels, setChannels] = useState({ EMAIL: true, SMS: false, WHATSAPP: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/contact/phone/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (data.success) {
        setShowOtp(true);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send OTP' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Try again.' });
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (otp) => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3001/api/contact/phone/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ phone, otp })
    });
    const data = await res.json();
    if (data.success) {
      setIsVerified(true);
      setMessage({ type: 'success', text: 'Phone number verified successfully!' });
    } else {
      throw new Error(data.error || 'Verification failed');
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Just an example mapping, in reality you'd need the verified email too
      // or assume the backend uses the user's primary email if email channel selected
      const selectedChannels = [];
      if (channels.EMAIL) selectedChannels.push({ channel: 'EMAIL', contact: 'user_primary' });
      if (channels.SMS) selectedChannels.push({ channel: 'SMS', contact: phone });
      if (channels.WHATSAPP) selectedChannels.push({ channel: 'WHATSAPP', contact: phone });

      const res = await fetch('http://localhost:3001/api/contact/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          channels: selectedChannels,
          purpose: 'PLATFORM_UPDATES',
          consentVersion: '1.1'
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: 'Preferences updated successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update preferences' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Communication Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Manage how Scheme Saathi contacts you regarding platform updates and application status.</p>

          {message && (
            <div className={`p-4 mb-6 rounded-xl ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-8">
            {/* Phone Verification Section */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Phone Number Verification</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-full sm:w-2/3">
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    onValidationChange={setIsPhoneValid}
                  />
                </div>
                {!isVerified ? (
                  <button
                    onClick={handleSendOtp}
                    disabled={!isPhoneValid || loading}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Sending...' : 'Verify'}
                  </button>
                ) : (
                  <div className="flex items-center text-green-600 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Verified
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-500">We strictly use standardized E.164 formats for reliable delivery.</p>
            </div>

            {/* Channels Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferred Channels</h3>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input type="checkbox" checked={channels.EMAIL} onChange={(e) => setChannels({...channels, EMAIL: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded" />
                  <div className="ml-4">
                    <span className="block text-gray-900 dark:text-white font-medium">Email</span>
                    <span className="block text-sm text-gray-500">Receive detailed updates and documents.</span>
                  </div>
                </label>

                <label className={`flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors ${!isVerified ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <input type="checkbox" disabled={!isVerified} checked={channels.SMS} onChange={(e) => setChannels({...channels, SMS: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded" />
                  <div className="ml-4">
                    <span className="block text-gray-900 dark:text-white font-medium">SMS</span>
                    <span className="block text-sm text-gray-500">Instant short alerts (Requires Verified Phone).</span>
                  </div>
                </label>

                <label className={`flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors ${!isVerified ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  <input type="checkbox" disabled={!isVerified} checked={channels.WHATSAPP} onChange={(e) => setChannels({...channels, WHATSAPP: e.target.checked})} className="w-5 h-5 text-indigo-600 rounded" />
                  <div className="ml-4">
                    <span className="block text-gray-900 dark:text-white font-medium">WhatsApp</span>
                    <span className="block text-sm text-gray-500">Interactive messages (Requires Verified Phone).</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSavePreferences}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 disabled:opacity-50 transition-all"
              >
                Save Preferences
              </button>
              <p className="mt-4 text-xs text-gray-500 text-center sm:text-left">
                By saving, you explicitly consent (v1.1) to receive communications via the selected channels. You can revoke this at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <OTPVerificationModal
        isOpen={showOtp}
        onClose={() => setShowOtp(false)}
        phoneNumber={phone}
        onVerify={handleVerifyOtp}
      />
    </div>
  );
};

export default CommunicationPreferences;
