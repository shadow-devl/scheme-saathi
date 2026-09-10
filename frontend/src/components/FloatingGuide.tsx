import { useState } from 'react';
import { HelpCircle, X, Navigation, Search, FileText, ChevronRight, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function FloatingGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'chat'>('menu');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAction = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-xl hover:bg-blue-600 hover:-translate-y-1 transition-all z-50 flex items-center justify-center group"
          aria-label="Open Guide"
        >
          <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-300 ease-in-out font-medium text-sm">
            Need Guidance?
          </span>
        </button>
      )}

      {/* Guide Panel Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden flex flex-col h-[500px] max-h-[80vh] animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Navigation className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">Scheme Saathi Guide</h3>
                <span className="text-xs text-blue-300">How can we help?</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-300 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-slate-50 relative">
            {view === 'menu' ? (
              <div className="p-4 space-y-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-sm text-slate-600 mb-4">
                    Welcome! I'm here to help you navigate entrepreneurial support programs. What are you looking to do?
                  </p>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleAction('/compare')}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group"
                    >
                      <div className="flex items-center text-sm font-medium text-slate-700 group-hover:text-blue-600">
                        <Search className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-600" />
                        Find Schemes for my Business
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                    
                    <button 
                      onClick={() => handleAction('/apply')}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group"
                    >
                      <div className="flex items-center text-sm font-medium text-slate-700 group-hover:text-blue-600">
                        <FileText className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-600" />
                        Check my Eligibility
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                    
                    <button 
                      onClick={() => setView('chat')}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group"
                    >
                      <div className="flex items-center text-sm font-medium text-slate-700 group-hover:text-blue-600">
                        <MessageSquare className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-600" />
                        Ask a specific question
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 ml-2">Quick Links</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleAction('/global-schemes')} className="bg-white p-2 text-xs font-medium text-slate-600 rounded border border-slate-200 hover:border-blue-300 hover:text-blue-600">Global Programs</button>
                    <button onClick={() => handleAction('/dashboard')} className="bg-white p-2 text-xs font-medium text-slate-600 rounded border border-slate-200 hover:border-blue-300 hover:text-blue-600">My Dashboard</button>
                    <button onClick={() => handleAction('/legal/acceptable-use')} className="bg-white p-2 text-xs font-medium text-slate-600 rounded border border-slate-200 hover:border-blue-300 hover:text-blue-600">Acceptable Use</button>
                    <button onClick={() => handleAction('/about')} className="bg-white p-2 text-xs font-medium text-slate-600 rounded border border-slate-200 hover:border-blue-300 hover:text-blue-600">Contact Support</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="bg-white p-2 border-b border-slate-200 flex items-center">
                  <button onClick={() => setView('menu')} className="text-slate-500 hover:text-slate-900 text-xs font-medium flex items-center p-1">
                    ← Back to menu
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="flex justify-start mb-4">
                    <div className="max-w-[85%] p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm rounded-bl-none shadow-sm">
                      <p>How can I help you today?</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white border-t border-slate-200">
                  <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-xs text-slate-500 font-medium">Demo Mode: AI Chat Disabled</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
