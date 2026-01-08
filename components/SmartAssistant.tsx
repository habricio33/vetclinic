
import React, { useState, useRef, useEffect } from 'react';
import { getSmartAssistance } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface SmartAssistantProps {
  onClose: () => void;
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Olá, Dr. Silva! Sou seu assistente inteligente VetClinic. Como posso ajudar com seus pacientes ou estoque hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const aiResponse = await getSmartAssistance(userMsg);
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse || 'Não consegui processar sua dúvida.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-6 w-[400px] max-h-[calc(100vh-120px)] h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-[100] animate-in slide-in-from-bottom-10 duration-300">
      <div className="p-6 bg-sidebar-bg text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined font-bold">robot_2</span>
          </div>
          <div>
            <h4 className="font-black text-sm tracking-tight leading-none">Smart Assistant</h4>
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase mt-1">Online • AI Powered</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-gray-50/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-primary text-sidebar-bg rounded-tr-none' 
                : 'bg-white text-text-main border border-gray-100 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 rounded-tl-none flex gap-1">
              <span className="size-1.5 bg-primary rounded-full animate-bounce"></span>
              <span className="size-1.5 bg-primary rounded-full animate-bounce delay-75"></span>
              <span className="size-1.5 bg-primary rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400 font-medium"
            placeholder="Pergunte sobre diagnósticos, estoque..."
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className={`absolute right-2 p-2 rounded-xl transition-all ${input.trim() ? 'bg-primary text-sidebar-bg shadow-sm' : 'text-gray-300'}`}
          >
            <span className="material-symbols-outlined font-bold">send</span>
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-3 font-bold uppercase tracking-tighter">Respostas geradas por inteligência artificial para apoio clínico.</p>
      </div>
    </div>
  );
};

export default SmartAssistant;
