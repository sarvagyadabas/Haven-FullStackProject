import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, ArrowLeft } from 'lucide-react';
import { Message, Mentor } from '../types';
import FooterNote from './FooterNote';
import { sendMessageToAI, initializeChat } from '../services/geminiService';
import { getSystemInstruction } from '../constants';

interface Props {
  mentor: Mentor;
  onReset: () => void;
}

const ChatInterface: React.FC<Props> = ({ mentor, onReset }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat with Mentor-specific instruction
  useEffect(() => {
    const init = async () => {
      // 1. Initialize the Gemini session with specific persona
      const systemInstruction = getSystemInstruction(mentor);
      await initializeChat(systemInstruction);

      // 2. Add initial greeting
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: 'init-1',
            role: 'model',
            text: mentor.greeting,
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 800);
    };
    init();
  }, [mentor]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMsgText = inputText.trim();
    setInputText('');
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userMsgText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // We pass the system instruction just in case, though it should be initialized
      const responseText = await sendMessageToAI(userMsgText);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadTranscript = () => {
    const text = messages.map(m => `[${m.timestamp.toLocaleTimeString()}] ${m.role === 'user' ? 'You' : mentor.name}: ${m.text}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mentor.name.toLowerCase()}-chat-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-50 relative">
      {/* Header */}
      <header className="bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-sm flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button onClick={onReset} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors flex-shrink-0" aria-label="Back">
            <ArrowLeft size={18} />
          </button>
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 overflow-hidden shadow-sm border border-slate-100">
              <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <div className="min-w-0">
            <h1 className="font-semibold text-slate-800 text-sm sm:text-base truncate">{mentor.name}</h1>
            <p className="text-[11px] sm:text-xs text-serene-600 font-medium truncate">{mentor.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            onClick={downloadTranscript}
            title="Download Transcript"
            className="p-2 text-slate-400 hover:text-serene-600 hover:bg-serene-50 rounded-full transition-colors"
            aria-label="Download transcript"
          >
            <Download size={18} />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 pb-24 sm:pb-24 scrollbar-hide">

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] sm:max-w-[75%] md:max-w-[65%] gap-2 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar (only for AI) */}
              {msg.role === 'model' && (
                 <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 mt-1 shadow-sm">
                   <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                 </div>
              )}

              <div 
                className={`
                  px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap
                  ${msg.role === 'user' 
                    ? 'bg-serene-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}
                `}
              >
                {msg.text}
                <div 
                  className={`text-[9px] mt-1 opacity-60 text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start w-full animate-fade-in">
             <div className="flex items-center gap-2 sm:gap-3">
               <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 shadow-sm">
                  <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
               </div>
               <div className="bg-white border border-slate-100 px-3 sm:px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                 <div className="w-2 h-2 bg-serene-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-serene-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-serene-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
             </div>
          </div>
        )}
        
        <FooterNote />
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-20 px-3 sm:px-4 py-2 sm:py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-2.5 sm:px-3 py-1.5 focus-within:ring-2 focus-within:ring-serene-100 focus-within:border-serene-300 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Message ${mentor.name}...`}
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-700 placeholder-slate-400 px-2 sm:px-3 py-1 outline-none"
            disabled={isTyping}
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className={`
              p-2 sm:p-2.5 rounded-full transition-all duration-200 flex items-center justify-center flex-shrink-0
              ${!inputText.trim() || isTyping 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-serene-600 text-white shadow-md shadow-serene-200 hover:bg-serene-700 active:scale-95'}
            `}
            aria-label="Send message"
          >
            <Send size={16} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;