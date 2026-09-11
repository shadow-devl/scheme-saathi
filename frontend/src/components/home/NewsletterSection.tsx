import { useTranslation } from 'react-i18next';
import { Send, Bell, Mail, MessageCircle, Smartphone } from 'lucide-react';
import { useState } from 'react';
import PhoneInput from '../common/PhoneInput';
import { API_URL } from '../../config';

export default function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [channels, setChannels] = useState({ EMAIL: true, SMS: false, WHATSAPP: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (channels.EMAIL && !email) {
      setErrorMessage('Please enter an email address for Email updates.');
      return;
    }
    
    if ((channels.SMS || channels.WHATSAPP) && !isPhoneValid) {
      setErrorMessage('Please enter a valid phone number in international format.');
      return;
    }

    if (!channels.EMAIL && !channels.SMS && !channels.WHATSAPP) {
      setErrorMessage('Please select at least one channel.');
      return;
    }
    
    setStatus('submitting');
    
    try {
      const selectedChannels = Object.keys(channels).filter((k) => channels[k as keyof typeof channels]);
      const res = await fetch(`${API_URL}/api/contact/public-subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, channels: selectedChannels })
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to subscribe.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  const needsPhone = channels.SMS || channels.WHATSAPP;

  return (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <Bell className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('home.newsletterTitle', 'Stay Updated on New Schemes')}
        </h2>
        <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
          {t('home.newsletterDesc', 'Government programs change frequently. Select how you want to be notified when new opportunities are announced.')}
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl text-left">
          
          <div className="mb-6">
            <h3 className="text-gray-900 font-semibold mb-3">Choose your channels:</h3>
            <div className="flex flex-wrap gap-4">
              <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${channels.EMAIL ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="checkbox" className="hidden" checked={channels.EMAIL} onChange={(e) => setChannels({...channels, EMAIL: e.target.checked})} />
                <Mail className="w-5 h-5" />
                <span className="font-medium">Email</span>
              </label>
              
              <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${channels.SMS ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="checkbox" className="hidden" checked={channels.SMS} onChange={(e) => setChannels({...channels, SMS: e.target.checked})} />
                <Smartphone className="w-5 h-5" />
                <span className="font-medium">SMS</span>
              </label>
              
              <label className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${channels.WHATSAPP ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="checkbox" className="hidden" checked={channels.WHATSAPP} onChange={(e) => setChannels({...channels, WHATSAPP: e.target.checked})} />
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">WhatsApp</span>
              </label>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {channels.EMAIL && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting' || status === 'success'}
                  required={channels.EMAIL}
                />
              </div>
            )}
            
            {needsPhone && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number (Format: +91...)</label>
                <PhoneInput 
                  value={phone}
                  onChange={setPhone}
                  onValidationChange={setIsPhoneValid}
                />
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4 font-medium">{errorMessage}</p>
          )}

          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center">
              <p className="font-bold">Subscription requested!</p>
              <p className="text-sm mt-1">Please check your selected channels to confirm.</p>
            </div>
          ) : (
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors flex items-center justify-center disabled:opacity-70 text-lg shadow-lg"
            >
              {status === 'submitting' ? 'Processing...' : 
               <><Send className="w-5 h-5 mr-2" /> Subscribe to Updates</>}
            </button>
          )}

          <p className="mt-4 text-xs text-gray-500 text-center">
            By subscribing, you explicitly consent to receive platform updates via the selected channels. See our <a href="#/legal/privacy" className="underline hover:text-gray-700">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
