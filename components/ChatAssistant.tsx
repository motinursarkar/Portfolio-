
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getPortfolioResponse } from '../geminiService';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Motinur's AI assistant. Ask me anything about his work!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getPortfolioResponse(input);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 glass-card rounded-2xl flex flex-col shadow-2xl overflow-hidden border-primary/30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 flex justify-between items-center text-white">
            <h3 className="font-semibold">Motinur AI</h3>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-dark/20">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  m.role === 'user' ? 'bg-primary text-white' : 'bg-slate-700 text-slate-100'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-2 rounded-lg text-sm animate-pulse">Thinking...</div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-slate-700">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1 bg-slate-800 border-none rounded-lg px-3 py-1 text-sm focus:ring-1 focus:ring-primary outline-none"
              />
              <button onClick={handleSend} className="bg-primary text-white p-2 rounded-lg hover:bg-primary/80">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform ring-4 ring-primary/20"
        >
          <i className="fa-solid fa-robot text-2xl"></i>
        </button>
      )}
    </div>
  );
};
