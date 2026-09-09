import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Check, X } from 'lucide-react';
import { API_URL } from '../config';

export default function PartnerDashboard() {
  const { token, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = () => {
    fetch(`${API_URL}/api/partner/applications`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApps();
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/api/partner/applications/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      fetchApps();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6 glass-panel p-6 rounded-2xl">
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Partner Portal</h1>
          <p className="text-gray-300 mt-2">{user?.name} - Application Queue</p>
        </div>
        <div className="bg-blue-900/40 p-4 rounded-xl border border-blue-400/30 flex items-center gap-4 shadow-inner backdrop-blur-md">
          <Users className="text-blue-400 h-8 w-8" />
          <div>
            <p className="text-sm font-medium text-blue-200">Pending Applications</p>
            <p className="text-2xl font-bold text-white drop-shadow-md">{applications.filter((a: any) => a.status === 'PENDING').length}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="glass-panel p-12 text-center text-white">Loading queue...</div>
      ) : (
        <div className="glass-panel rounded-2xl shadow-xl overflow-hidden border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-black/20">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">App ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Applicant Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Requested Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-white/10">
              {applications.map((app: any) => (
                <tr key={app.application_id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{app.application_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{app.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">₹{app.estimated_cost?.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm backdrop-blur-md ${
                      app.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30' :
                      app.status === 'APPROVED' || app.status === 'DISBURSED' ? 'bg-blue-500/20 text-blue-200 border border-blue-500/30' :
                      'bg-red-500/20 text-red-200 border border-red-500/30'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {app.status === 'PENDING' && (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => updateStatus(app.application_id, 'APPROVED')} className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/20 rounded-xl transition-all" title="Approve">
                          <Check className="h-5 w-5" />
                        </button>
                        <button onClick={() => updateStatus(app.application_id, 'REJECTED')} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-xl transition-all" title="Reject">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                    {app.status === 'APPROVED' && (
                       <button onClick={() => updateStatus(app.application_id, 'DISBURSED')} className="text-blue-300 hover:text-white font-bold border border-blue-400/50 px-4 py-2 rounded-xl hover:bg-blue-500/30 transition-all shadow-sm">
                         Mark Disbursed
                       </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && (
             <div className="p-12 text-center text-gray-400 italic">No applications in your queue.</div>
          )}
        </div>
      )}
    </div>
  );
}
