import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Activity, IndianRupee, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/analytics`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, [token]);

  if (!stats) return <div className="p-12 text-center">Loading Analytics...</div>;

  const appStatusData = [
    { name: 'Approved/Disbursed', value: stats.approvedApplications, color: '#4F46E5' },
    { name: 'Pending', value: stats.pendingApplications, color: '#F59E0B' },
    { name: 'Rejected', value: stats.totalApplications - stats.approvedApplications - stats.pendingApplications, color: '#EF4444' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-base">Ministry Analytics Dashboard</h1>
        <p className="text-text-muted mt-2">Global view of Scheme Saathi platform performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <KPICard 
          title="Total Applications" 
          value={stats.totalApplications} 
          icon={<FileText className="h-6 w-6 text-white" />} 
          color="bg-blue-500" 
        />
        <KPICard 
          title="Funds Disbursed" 
          value={`₹${(stats.totalDisbursed / 10000000).toFixed(2)} Cr`} 
          subtitle={`of ₹${(stats.totalAllocated / 10000000).toFixed(2)} Cr Allocated`}
          icon={<IndianRupee className="h-6 w-6 text-white" />} 
          color="bg-blue-500" 
        />
        <KPICard 
          title="Avg NPA Rate" 
          value={`${(stats.partnerNpas.reduce((acc: number, p: any) => acc + p.npa, 0) / Math.max(stats.partnerNpas.length, 1)).toFixed(1)}%`} 
          icon={<Activity className="h-6 w-6 text-white" />} 
          color={stats.partnerNpas.reduce((acc: number, p: any) => acc + p.npa, 0) / stats.partnerNpas.length > 5 ? "bg-red-500" : "bg-blue-500"} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Status Chart */}
        <div className="bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle p-6 rounded-2xl shadow-sm border border-border-subtle">
          <h3 className="text-lg font-bold text-text-base mb-6">Application Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={appStatusData} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {appStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {appStatusData.map(entry => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-text-muted">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* Partner NPA Chart */}
        <div className="bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle p-6 rounded-2xl shadow-sm border border-border-subtle">
          <h3 className="text-lg font-bold text-text-base mb-6">Partner NPA Tracking</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.partnerNpas} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" unit="%" />
                <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="npa" name="NPA %">
                  {stats.partnerNpas.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.npa > 5 ? '#EF4444' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, subtitle, icon, color }: any) {
  return (
    <div className="bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle p-6 rounded-2xl shadow-sm border border-border-subtle flex items-center gap-6">
      <div className={`p-4 rounded-xl ${color} shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-text-muted">{title}</p>
        <p className="text-3xl font-bold text-text-base mt-1">{value}</p>
        {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
