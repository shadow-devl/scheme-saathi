import { Cpu, Zap, Activity, MessageSquare, Play, Settings2 } from 'lucide-react';

export default function AIWorkflows() {
  const workflows = [
    { id: 1, name: 'Lead Qualification Bot', trigger: 'New Lead Created', action: 'Score & Send Email', status: 'Active', runs: 1250, icon: MessageSquare },
    { id: 2, name: 'Invoice Reminder', trigger: '3 Days Overdue', action: 'Send Slack & Email', status: 'Active', runs: 84, icon: Zap },
    { id: 3, name: 'Customer Support Triager', trigger: 'New Support Ticket', action: 'Assign & Tag Priority', status: 'Paused', runs: 412, icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-base flex items-center gap-2">
            <Cpu className="h-6 w-6 text-primary" />
            AI Workflows & Agents
          </h1>
          <p className="text-text-muted mt-1">Automate tasks and deploy AI agents for your business operations.</p>
        </div>
        <button className="bg-blue-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition-colors text-sm font-medium w-full sm:w-auto justify-center">
          <Zap className="h-4 w-4" /> Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border-blue-200 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-50 blur-3xl rounded-full"></div>
          <h2 className="text-lg font-bold text-text-base mb-2">Scheme Saathi AI Assistant</h2>
          <p className="text-sm text-text-muted mb-6">Your central AI command center. Ask it to generate reports, draft emails, or analyze your sales pipeline.</p>
          <button className="flex items-center gap-2 text-primary font-medium hover:text-primary transition-colors">
            <MessageSquare className="h-5 w-5" /> Open Chat Interface
          </button>
        </div>

        <div className="glass-panel p-6 border-blue-200 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-50 blur-3xl rounded-full"></div>
          <h2 className="text-lg font-bold text-text-base mb-2">Automations</h2>
          <p className="text-sm text-text-muted mb-6">2 Active Workflows • Saved approx. 14 hours this week.</p>
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">1.3k</span>
              <span className="text-xs text-text-muted">Total Runs</span>
            </div>
            <div className="w-px bg-bg-base"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">99.8%</span>
              <span className="text-xs text-text-muted">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 mt-6">
        <h2 className="text-lg font-bold text-text-base mb-6">My Workflows</h2>
        
        <div className="space-y-4">
          {workflows.map(wf => (
            <div key={wf.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white border border-border-subtle hover:border-blue-200 transition-colors gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg border ${
                  wf.status === 'Active' ? 'bg-blue-50 text-primary border-blue-200' : 'bg-bg-base text-text-muted border-border-subtle'
                }`}>
                  <wf.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-text-base">{wf.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                    <span>When: <strong className="text-text-muted font-medium">{wf.trigger}</strong></span>
                    <span>→</span>
                    <span>Do: <strong className="text-text-muted font-medium">{wf.action}</strong></span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 justify-between sm:justify-end border-t sm:border-t-0 border-border-subtle pt-4 sm:pt-0">
                <div className="text-center sm:text-right">
                  <p className="text-sm font-medium text-text-muted">{wf.runs}</p>
                  <p className="text-xs text-text-muted">Executions</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={wf.status === 'Active'} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                  <button className="p-2 text-text-muted hover:text-primary transition-colors ml-2">
                    <Settings2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
