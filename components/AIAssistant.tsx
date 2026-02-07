
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Cześć! Jestem Twoim ekspertem MVM Patron AI. Jak mogę Ci dzisiaj pomóc w sprawach opon, naprawy dętek rowerowych, gwintów czy profesjonalnego czyszczenia felg?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);
  const RATE_LIMIT_COUNT = 5;
  const RATE_LIMIT_WINDOW = 60000; 

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      
      const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 400);
      const maxY = window.innerHeight - (windowRef.current?.offsetHeight || 600);
      
      setPosition({
        x: Math.max(10, Math.min(newX, maxX - 10)),
        y: Math.max(80, Math.min(newY, maxY - 10))
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  const checkRateLimit = () => {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    const recentRequests = requestTimestamps.filter(ts => ts > windowStart);
    
    if (recentRequests.length >= RATE_LIMIT_COUNT) {
      return false;
    }
    
    setRequestTimestamps([...recentRequests, now]);
    return true;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth < 640) return;
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleSendMessage = async () => {
    const sanitizedInput = input.trim();
    if (!sanitizedInput || isLoading) return;

    setErrorMsg(null);
    if (!checkRateLimit()) {
      setErrorMsg("Zbyt wiele zapytań. Odczekaj chwilę przed kolejną wiadomością.");
      return;
    }

    const userMessage = sanitizedInput;
    setInput('');
    const updatedMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Create fresh AI instance to ensure latest key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Filter the conversation history to ensure it starts with a 'user' message.
      // Gemini's generateContent for chat-like multi-turn history expects the first entry to be from the user.
      const apiHistory = updatedMessages
        .filter((msg, index) => !(index === 0 && msg.role === 'assistant'))
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: apiHistory,
        config: {
          systemInstruction: 'Jesteś ekspertem wulkanizacji pracującym dla warsztatu MVM Patron w Pisarzowicach. Specjalizujemy się w: Motocyklach (szosowe, turystyczne, skutery, choppery), Serwisie dętek rowerowych, Autach 4x4, Autach osobowych oraz Detailingu kół. Odpowiadaj profesjonalnie, zwięźle i po polsku. Zawsze zachęcaj do kontaktu telefonicznego +48 721 456 905 w pilnych sprawach.',
          temperature: 0.7,
        }
      });

      const aiResponseText = response.text;
      if (!aiResponseText) throw new Error("Empty response from API");
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponseText }]);
    } catch (error: any) {
      console.error("AI API Error:", error);
      setErrorMsg("Przepraszam, wystąpił problem z połączeniem. Spróbuj ponownie za chwilę.");
    } finally {
      setIsLoading(false);
    }
  };

  const dynamicStyle: React.CSSProperties = (position.x !== 0 || position.y !== 0) 
    ? { left: `${position.x}px`, top: `${position.y}px`, bottom: 'auto', right: 'auto' }
    : {};

  return (
    <div 
      ref={windowRef}
      style={dynamicStyle}
      className={`fixed inset-x-0 bottom-0 top-20 sm:top-auto sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-auto max-h-[calc(100vh-100px)] sm:max-h-[750px] bg-white sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-[100] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 ${isDragging ? 'select-none' : ''}`}
    >
      {/* Header */}
      <div 
        onMouseDown={handleMouseDown}
        className={`bg-orange-600 text-white p-4 flex justify-between items-center shrink-0 shadow-lg ${isDragging ? 'cursor-grabbing' : 'sm:cursor-move'}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center font-black text-sm">MVM</div>
          <div>
            <h3 className="font-bold leading-none text-sm">MVM Patron AI</h3>
            <span className="text-[9px] font-bold text-orange-200 uppercase tracking-widest">Ekspert Online</span>
          </div>
        </div>
        <button 
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose} 
          className="p-2 bg-black/10 hover:bg-black/20 rounded-xl transition-all border border-white/10 group active:scale-95"
        >
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3.5 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-orange-600 text-white rounded-tr-none shadow-md' 
                : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
            }`}>
              <p className="text-[13px] font-semibold leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex gap-1.5">
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-50 border border-red-100 p-2.5 rounded-xl text-red-600 text-[10px] font-bold text-center">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="relative flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="W czym możemy pomóc?"
            className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-slate-100 border-none outline-none focus:ring-2 focus:ring-orange-600/20 transition-all text-sm font-semibold text-slate-700 placeholder:text-slate-400"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 p-2 text-orange-600 hover:bg-orange-600 hover:text-white disabled:opacity-30 rounded-xl transition-all active:scale-90"
          >
            <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
