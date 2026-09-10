import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hello! I am the Scheme Saathi AI Assistant. How can I help you find the right financial scheme today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');
    
    // Simulate AI response based on keywords
    setTimeout(() => {
      let response = "I can help you find schemes, explain eligibility, or guide you through the application process. What would you like to know?";
      const lowerInput = currentInput.toLowerCase();
      
      if (lowerInput.includes('loan') || lowerInput.includes('scheme')) {
        response = "We have access to hundreds of government micro-loans and schemes. You can use the 'Find Schemes' button to get matched, or check the 'Global Schemes' directory!";
      } else if (lowerInput.includes('document') || lowerInput.includes('kyc') || lowerInput.includes('aadhaar')) {
        response = "For most applications, you will need your Aadhaar card, PAN card, and a basic project report. You can upload these in your Applicant Dashboard.";
      } else if (lowerInput.includes('status')) {
        response = "You can track your application status in real-time by logging into your Applicant Dashboard. It shows a complete timeline of your progress.";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 hover:-translate-y-1 transition-all z-50 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle rounded-2xl shadow-2xl border border-border-subtle z-50 overflow-hidden flex flex-col h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-blue-50  text-text-base p-4 flex justify-between items-center shadow-lg border-b border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-inner border border-blue-200">
                <img src="./logo.jpg" alt="Scheme Saathi AI" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">Scheme Saathi AI</h3>
                <span className="text-xs text-blue-200">Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-base bg-slate-50 p-1 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg-base">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-text-base rounded-br-none' : 'bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle border text-text-base rounded-bl-none shadow-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white shadow-card rounded-[17px] border border-border-subtle/60  border-border-subtle border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
