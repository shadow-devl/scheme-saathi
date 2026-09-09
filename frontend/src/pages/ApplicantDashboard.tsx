import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, Clock, CheckCircle, Upload, File, XCircle } from 'lucide-react';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';

const TIMELINE_STEPS = ['Submitted', 'Verification', 'Review', 'Decision'];

export default function ApplicantDashboard() {
  const { token, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Document Vault State (Simulated)
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhaar Card', status: 'Verified' },
    { id: 2, name: 'PAN Card', status: 'Pending' }
  ]);

  useEffect(() => {
    fetch(`${API_URL}/api/applications/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments([...documents, { 
        id: Date.now(), 
        name: e.target.files[0].name, 
        status: 'Uploaded' 
      }]);
    }
  };

  const getStepProgress = (status: string) => {
    switch (status) {
      case 'PENDING': return 1; // Submitted -> Verification (in progress)
      case 'APPROVED': 
      case 'REJECTED': 
      case 'DISBURSED': return 4;
      default: return 0;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Applicant Dashboard</h1>
          <p className="text-gray-300 drop-shadow-sm">Welcome back, {user?.name}. Track your applications and manage documents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white drop-shadow-md">Your Applications</h2>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-white/5 rounded-2xl w-full"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center p-12 glass-panel border border-dashed border-white/20 rounded-3xl">
              <FileText className="h-12 w-12 text-emerald-300/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white drop-shadow-sm">No applications yet</h3>
              <p className="text-gray-300 mt-2 mb-8">Discover and apply for matching financial schemes.</p>
              <Link to="/apply" className="inline-flex items-center px-8 py-3 border border-emerald-500/50 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform hover:-translate-y-1 text-white bg-emerald-600/80 hover:bg-emerald-600 font-medium transition-all backdrop-blur-md">
                Find Schemes
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app: any) => (
                <div key={app.application_id} className="glass-panel p-6 rounded-3xl shadow-lg border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">ID: {app.application_id}</span>
                      <h3 className="text-xl font-bold text-white mt-1 drop-shadow-sm">Loan Request: ₹{app.estimated_cost?.toLocaleString('en-IN')}</h3>
                      <p className="text-sm text-gray-400 mt-1">Submitted on {new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-md ${
                        app.status === 'APPROVED' || app.status === 'DISBURSED' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                        app.status === 'REJECTED' ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Visual Status Timeline */}
                  <div className="relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-white/10 shadow-inner">
                      <div 
                        style={{ width: `${(getStepProgress(app.status) / TIMELINE_STEPS.length) * 100}%` }} 
                        className={`shadow-[0_0_10px_rgba(255,255,255,0.5)] flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                          app.status === 'REJECTED' ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
                      {TIMELINE_STEPS.map((step, idx) => (
                        <div key={step} className={`text-center ${getStepProgress(app.status) > idx ? 'text-emerald-300 font-bold drop-shadow-sm' : ''}`}>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Document Vault Sidebar */}
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-3xl shadow-lg border border-white/10">
            <h2 className="text-xl font-bold text-white mb-2 drop-shadow-md">Document Vault</h2>
            <p className="text-sm text-gray-300 mb-8 leading-relaxed">Upload your KYC and project documents to speed up the verification process.</p>
            
            <div className="space-y-4 mb-8">
              {documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-colors shadow-sm">
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-medium text-gray-200">{doc.name}</span>
                  </div>
                  {doc.status === 'Verified' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : doc.status === 'Uploaded' ? (
                    <Clock className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <span className="text-xs font-semibold bg-yellow-500/20 text-yellow-300 px-2.5 py-1 rounded-lg border border-yellow-500/30">{doc.status}</span>
                  )}
                </div>
              ))}
            </div>

            <label className="flex flex-col items-center justify-center w-full h-36 px-4 transition-all bg-white/5 backdrop-blur-md border border-white/20 border-dashed rounded-2xl appearance-none cursor-pointer hover:bg-white/10 hover:border-emerald-400 focus:outline-none shadow-inner group">
              <span className="flex flex-col items-center space-y-2">
                <Upload className="w-8 h-8 text-emerald-300 group-hover:text-emerald-400 transition-colors drop-shadow-sm" />
                <span className="font-medium text-gray-300 text-sm">Drop files or click to upload</span>
              </span>
              <input type="file" name="file_upload" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
