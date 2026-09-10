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
    <div className="max-w-[1500px] mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-base mb-2 ">Applicant Dashboard</h1>
          <p className="text-text-muted ">Welcome back, {user?.name}. Track your applications and manage documents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xl font-bold text-text-base ">Your Applications</h2>
          
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-white rounded-2xl w-full"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center p-12 glass-panel border border-dashed border-border-subtle rounded-3xl">
              <FileText className="h-12 w-12 text-primary/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-base ">No applications yet</h3>
              <p className="text-text-muted mt-2 mb-8">Discover and apply for matching financial schemes.</p>
              <Link to="/apply" className="inline-flex items-center px-8 py-3 border border-blue-200 rounded-xl shadow-sm hover:shadow-sm transform hover:-translate-y-1 text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 font-medium transition-all ">
                Find Schemes
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app: any) => (
                <div key={app.application_id} className="glass-panel p-6 rounded-3xl shadow-lg border border-border-subtle hover:border-blue-200 transition-colors">
                  <div className="flex justify-between items-start mb-6 border-b border-border-subtle pb-4">
                    <div>
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">ID: {app.application_id}</span>
                      <h3 className="text-xl font-bold text-text-base mt-1 ">Loan Request: ₹{app.estimated_cost?.toLocaleString('en-IN')}</h3>
                      <p className="text-sm text-text-muted mt-1">Submitted on {new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border  ${
                        app.status === 'APPROVED' || app.status === 'DISBURSED' ? 'bg-blue-50 text-primary border-blue-200' :
                        app.status === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Visual Status Timeline */}
                  <div className="relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-50 shadow-inner">
                      <div 
                        style={{ width: `${(getStepProgress(app.status) / TIMELINE_STEPS.length) * 100}%` }} 
                        className={`shadow-sm flex flex-col text-center whitespace-nowrap text-text-base justify-center transition-all duration-500 ${
                          app.status === 'REJECTED' ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-text-muted font-medium px-1">
                      {TIMELINE_STEPS.map((step, idx) => (
                        <div key={step} className={`text-center ${getStepProgress(app.status) > idx ? 'text-primary font-bold ' : ''}`}>
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
          <div className="glass-panel p-8 rounded-3xl shadow-lg border border-border-subtle">
            <h2 className="text-xl font-bold text-text-base mb-2 ">Document Vault</h2>
            <p className="text-sm text-text-muted mb-8 leading-relaxed">Upload your KYC and project documents to speed up the verification process.</p>
            
            <div className="space-y-4 mb-8">
              {documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-border-subtle hover:border-blue-200 transition-colors shadow-sm group">
                  <div className="flex items-center gap-3">
                    <File className="w-5 h-5 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm font-medium text-text-base">{doc.name}</span>
                  </div>
                  {doc.status === 'Verified' ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  ) : doc.status === 'Uploaded' ? (
                    <Clock className="w-5 h-5 text-primary" />
                  ) : (
                    <span className="text-xs font-semibold bg-yellow-500/20 text-yellow-600 px-2.5 py-1 rounded-lg border border-yellow-500/30">{doc.status}</span>
                  )}
                </div>
              ))}
            </div>

            <label className="flex flex-col items-center justify-center w-full h-36 px-4 transition-all bg-white  border border-border-subtle border-dashed rounded-2xl appearance-none cursor-pointer hover:bg-slate-50 hover:border-blue-400 focus:outline-none shadow-inner group">
              <span className="flex flex-col items-center space-y-2">
                <Upload className="w-8 h-8 text-primary group-hover:text-primary transition-colors " />
                <span className="font-medium text-text-muted text-sm">Drop files or click to upload</span>
              </span>
              <input type="file" name="file_upload" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
