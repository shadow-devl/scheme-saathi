import { useState } from 'react';
import { Save, Building, Globe, MapPin, CheckCircle, Users } from 'lucide-react';

export default function BusinessProfile() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Business Profile</h1>
          <p className="text-gray-400 mt-1">Manage your organization's public and internal details.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
              <Building className="h-5 w-5 text-emerald-400" />
              General Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Legal Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corporation"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
                <select className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors">
                  <option value="">Select Industry...</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="health">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Registration Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-none"
                  placeholder="Briefly describe what your business does..."
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-100 flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-400" />
              Contact & Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Website</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Support Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">HQ Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold text-gray-100 mb-4">Verification Status</h2>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-emerald-400 font-medium">Business Verified</h3>
                <p className="text-sm text-gray-400 mt-1">Your business has passed primary verification. You can access all ecosystem features.</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              Team Members
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">A</div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">Admin User</p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                </div>
              </div>
              <button className="w-full py-2 border border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors text-sm font-medium">
                + Invite Member
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
