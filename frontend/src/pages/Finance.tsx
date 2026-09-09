import { DollarSign, ArrowUpRight, ArrowDownRight, FileText, Download } from 'lucide-react';

export default function Finance() {
  const transactions = [
    { id: 'TRX-1092', desc: 'Enterprise Software License', date: 'Sep 09, 2026', amount: 4500, type: 'income', status: 'Completed' },
    { id: 'TRX-1091', desc: 'AWS Cloud Hosting', date: 'Sep 08, 2026', amount: -340.50, type: 'expense', status: 'Completed' },
    { id: 'TRX-1090', desc: 'Consulting Retainer - Acme', date: 'Sep 05, 2026', amount: 2000, type: 'income', status: 'Pending' },
    { id: 'TRX-1089', desc: 'Office Supplies', date: 'Sep 02, 2026', amount: -125.00, type: 'expense', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Finance & Invoicing</h1>
          <p className="text-gray-400 mt-1">Manage revenue, expenses, and invoices.</p>
        </div>
        <button className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-emerald-400 transition-colors">
          Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all"></div>
          <p className="text-gray-400 text-sm font-medium mb-1">Total Balance</p>
          <h2 className="text-4xl font-bold text-gray-100">$42,500.00</h2>
          <div className="mt-4 flex items-center text-sm font-medium text-emerald-400 bg-emerald-500/10 w-max px-2 py-1 rounded border border-emerald-500/20">
            <ArrowUpRight className="h-4 w-4 mr-1" /> +12.5% from last month
          </div>
        </div>
        <div className="glass-panel p-6">
          <p className="text-gray-400 text-sm font-medium mb-1">Monthly Income</p>
          <h2 className="text-3xl font-bold text-emerald-400">$18,200.00</h2>
          <div className="mt-4 flex items-center text-sm font-medium text-gray-400">
            32 Invoices Paid
          </div>
        </div>
        <div className="glass-panel p-6">
          <p className="text-gray-400 text-sm font-medium mb-1">Monthly Expenses</p>
          <h2 className="text-3xl font-bold text-red-400">$4,300.50</h2>
          <div className="mt-4 flex items-center text-sm font-medium text-gray-400">
            14 Transactions
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-100">Recent Transactions</h2>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {transactions.map(trx => (
              <div key={trx.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${trx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {trx.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">{trx.desc}</p>
                    <p className="text-xs text-gray-500">{trx.date} • {trx.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${trx.type === 'income' ? 'text-emerald-400' : 'text-gray-200'}`}>
                    {trx.type === 'income' ? '+' : ''}{trx.amount < 0 ? `-$${Math.abs(trx.amount).toFixed(2)}` : `$${trx.amount.toFixed(2)}`}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${trx.status === 'Completed' ? 'bg-gray-800 text-gray-400' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                    {trx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-100">Outstanding Invoices</h2>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">View All</button>
          </div>
          
          <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-800 rounded-lg bg-gray-900/20">
            <FileText className="h-10 w-10 text-gray-600 mb-3" />
            <p className="text-gray-300 font-medium">No outstanding invoices</p>
            <p className="text-sm text-gray-500 mt-1">All your clients are caught up!</p>
          </div>

          <div className="mt-6 border-t border-gray-800 pt-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all font-medium text-sm">
                <FileText className="h-4 w-4" /> Send Invoice
              </button>
              <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all font-medium text-sm">
                <Download className="h-4 w-4" /> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
