import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, User, Mail, Shield, Bell } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your personal account preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 space-y-2 shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
              activeTab === 'profile' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:bg-gray-900'
            }`}
          >
            <User className="h-5 w-5" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
              activeTab === 'security' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:bg-gray-900'
            }`}
          >
            <Shield className="h-5 w-5" /> Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
              activeTab === 'notifications' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:bg-gray-900'
            }`}
          >
            <Bell className="h-5 w-5" /> Notifications
          </button>
        </div>

        <div className="flex-1 glass-panel p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-100">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-100">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-gray-800">
                  <div>
                    <h3 className="text-gray-100 font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-100">Notification Preferences</h2>
              <div className="space-y-4">
                {['Email Updates', 'Push Notifications', 'Weekly Reports', 'New Lead Alerts'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/30 border border-gray-800">
                    <span className="text-gray-200">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={i % 2 === 0} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
