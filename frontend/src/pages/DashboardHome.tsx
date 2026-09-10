import { useAuth } from '../context/AuthContext';
import { Users, Briefcase, DollarSign, TrendingUp, ArrowUpRight, Target, PieChart } from 'lucide-react';
import ApplicantDashboard from './ApplicantDashboard';

function EntrepreneurView() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Leads', value: '128', change: '+12%', icon: Users },
    { name: 'Active Projects', value: '14', change: '+2', icon: Briefcase },
    { name: 'Monthly Revenue', value: '$24,500', change: '+18%', icon: DollarSign },
    { name: 'Growth Rate', value: '24%', change: '+4.3%', icon: TrendingUp },
  ];

  const recentActivity = [
    { id: 1, text: 'New lead assigned from Web Form', time: '10 mins ago', type: 'lead' },
    { id: 2, text: 'Project "Alpha" reached milestone 2', time: '1 hour ago', type: 'project' },
    { id: 3, text: 'Invoice #0045 paid by client', time: '2 hours ago', type: 'finance' },
    { id: 4, text: 'AI Workflow "Email Follow-up" triggered', time: '4 hours ago', type: 'ai' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-base">Welcome back, {user?.name || 'Entrepreneur'}</h1>
          <p className="text-text-muted mt-1">Here is what's happening with your business today.</p>
        </div>
        <button className="glass-panel px-4 py-2 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors text-primary font-medium">
          New Quick Action
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-panel p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-primary border border-blue-200">
                {stat.change}
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-text-base">{stat.value}</h3>
              <p className="text-sm text-text-muted mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="lg:col-span-2 xl:col-span-3 glass-panel p-6">
          <h2 className="text-lg font-bold text-text-base mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-border-subtle rounded-xl bg-slate-50/50">
            <p className="text-text-muted flex flex-col items-center gap-2">
              <TrendingUp className="h-8 w-8 opacity-50" />
              Chart integration coming soon
            </p>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-bold text-text-base mb-4">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative">
                <div className="w-px h-full bg-border-subtle absolute left-2.5 top-6"></div>
                <div className="relative z-10 w-5 h-5 rounded-full bg-white border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-base">{activity.text}</p>
                  <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InvestorView() {
  const { user } = useAuth();

  const stats = [
    { name: 'Active Investments', value: '8', change: '+1', icon: Briefcase },
    { name: 'Portfolio Value', value: '₹4.5Cr', change: '+12.5%', icon: TrendingUp },
    { name: 'New Pitch Decks', value: '24', change: '+5', icon: Target },
    { name: 'Average ROI', value: '18.2%', change: '+2.1%', icon: PieChart },
  ];

  const recentActivity = [
    { id: 1, text: 'Startup "TechNova" uploaded new financial report', time: '2 hours ago', type: 'report' },
    { id: 2, text: 'Pitch deck received from "AgriGrow"', time: '5 hours ago', type: 'pitch' },
    { id: 3, text: 'Dividend received from Fund Alpha', time: '1 day ago', type: 'finance' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-base">Welcome back, {user?.name || 'Investor'}</h1>
          <p className="text-text-muted mt-1">Here is a snapshot of your investment portfolio.</p>
        </div>
        <button className="glass-panel px-4 py-2 flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors text-primary font-medium">
          Browse Startups
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-panel p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <stat.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                {stat.change}
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-text-base">{stat.value}</h3>
              <p className="text-sm text-text-muted mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="lg:col-span-2 xl:col-span-3 glass-panel p-6">
          <h2 className="text-lg font-bold text-text-base mb-4">Portfolio Growth</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-border-subtle rounded-xl bg-slate-50/50">
            <p className="text-text-muted flex flex-col items-center gap-2">
              <TrendingUp className="h-8 w-8 opacity-50" />
              Portfolio analytics chart coming soon
            </p>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="text-lg font-bold text-text-base mb-4">Deal Flow</h2>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative">
                <div className="w-px h-full bg-border-subtle absolute left-2.5 top-6"></div>
                <div className="relative z-10 w-5 h-5 rounded-full bg-white border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-base">{activity.text}</p>
                  <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  
  if (user?.role === 'USER' || user?.role === 'APPLICANT') {
    return <ApplicantDashboard />;
  }
  
  if (user?.role === 'INVESTOR') {
    return <InvestorView />;
  }
  
  return <EntrepreneurView />;
}
