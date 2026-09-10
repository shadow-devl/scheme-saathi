import { useState } from 'react';
import { Users, Filter, Plus, Phone, Mail, MoreVertical } from 'lucide-react';

export default function CRM() {
  const [activeTab, setActiveTab] = useState('pipeline');

  const pipelineStages = [
    { name: 'Lead', color: 'border-blue-500' },
    { name: 'Contacted', color: 'border-yellow-500' },
    { name: 'Qualified', color: 'border-purple-500' },
    { name: 'Proposal', color: 'border-orange-500' },
    { name: 'Won', color: 'border-blue-500' }
  ];

  const deals = [
    { id: 1, title: 'Enterprise Software Integration', client: 'Acme Corp', amount: '$45,000', stage: 'Qualified', probability: 70 },
    { id: 2, title: 'Cloud Migration', client: 'Globex Inc', amount: '$12,500', stage: 'Proposal', probability: 90 },
    { id: 3, title: 'Security Audit', client: 'Initech', amount: '$8,000', stage: 'Lead', probability: 20 },
    { id: 4, title: 'Mobile App Development', client: 'Soylent Corp', amount: '$85,000', stage: 'Won', probability: 100 },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-base">CRM & Sales</h1>
          <p className="text-text-muted mt-1">Manage leads, pipelines, and customers.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="glass-panel px-4 py-2 flex items-center gap-2 hover:bg-bg-base transition-colors text-sm font-medium w-full sm:w-auto justify-center">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="bg-blue-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-400 transition-colors text-sm font-medium w-full sm:w-auto justify-center">
            <Plus className="h-4 w-4" /> New Deal
          </button>
        </div>
      </div>

      <div className="flex items-center border-b border-border-subtle gap-6">
        {['pipeline', 'customers', 'leads'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors capitalize relative ${
              activeTab === tab ? 'text-primary' : 'text-text-muted hover:text-text-base'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 rounded-t-full shadow-sm"></div>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'pipeline' && (
        <div className="flex-1 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max h-full">
            {pipelineStages.map((stage) => (
              <div key={stage.name} className="w-80 flex flex-col glass-panel border-t-4 bg-white shadow-card rounded-[17px] border border-border-subtle/30" style={{ borderTopColor: 'var(--tw-border-opacity, 1)' }}>
                <div className={`p-4 border-b border-border-subtle flex items-center justify-between border-t-2 ${stage.color}`}>
                  <h3 className="font-semibold text-text-base">{stage.name}</h3>
                  <span className="text-xs font-medium text-text-muted bg-bg-base px-2 py-1 rounded-full">
                    {deals.filter(d => d.stage === stage.name).length}
                  </span>
                </div>
                <div className="p-4 flex-1 space-y-4 overflow-y-auto min-h-[300px]">
                  {deals.filter(d => d.stage === stage.name).map(deal => (
                    <div key={deal.id} className="glass-panel p-4 cursor-grab hover:border-blue-200 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-text-base font-medium text-sm leading-tight group-hover:text-primary transition-colors">{deal.title}</h4>
                        <button className="text-text-muted hover:text-text-muted">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-text-muted mb-4">{deal.client}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-text-base">{deal.amount}</span>
                        <div className="flex items-center gap-1 text-xs text-primary bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {deal.probability}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="glass-panel overflow-hidden">
          <table className="w-full text-left text-sm text-text-muted">
            <thead className="bg-white text-text-muted uppercase font-semibold border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-bg-base hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary font-bold border border-blue-200">
                        C
                      </div>
                      <div>
                        <p className="text-text-base font-medium">Customer Corp {i}</p>
                        <p className="text-xs text-text-muted">Added Sep 2026</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button className="text-text-muted hover:text-primary transition-colors"><Mail className="h-4 w-4" /></button>
                      <button className="text-text-muted hover:text-primary transition-colors"><Phone className="h-4 w-4" /></button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-primary border border-blue-200 rounded-full text-xs font-medium">Active</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'leads' && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200 mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text-base mb-2">No leads yet</h3>
          <p className="text-text-muted max-w-md mb-6">Connect your web forms or import a CSV to start managing leads in your pipeline.</p>
          <button className="bg-blue-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
            Import Leads
          </button>
        </div>
      )}
    </div>
  );
}
