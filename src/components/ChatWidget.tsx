import React, { useState, useRef, useEffect } from 'react';
import { PyramidLogo } from './PyramidLogo';
import { ChatMessage } from '../types';
import { PYRAMID_CLINIC_INFO, FAQ_KNOWLEDGE_BASE, matchFAQLocal } from '../data/faqKnowledgeBase';
import { 
  Send, Phone, Calendar, MapPin, Clock, RotateCcw, X, ExternalLink, 
  HelpCircle, AlertTriangle, ShieldCheck, Sparkles, Volume2, VolumeX, Copy, Check
} from 'lucide-react';

interface ChatWidgetProps {
  isEmbedded?: boolean;
  onClose?: () => void;
  initialQuery?: string;
}

const QUICK_SUGGESTIONS = [
  "What are your opening hours?",
  "Where are you located?",
  "How do I book an appointment?",
  "What services do you offer?",
  "Do you provide surgical procedures?",
  "Do you have an after-hours service?",
  "Do you accept pet insurance?",
  "What preventive care do you offer?",
  "Do you offer alternative or laser therapy?",
  "Can I get medications renewed?"
];

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isEmbedded = false,
  onClose,
  initialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: `Hello! Welcome to Pyramid Veterinary Surgery in Gordonvale, QLD. How can we assist you and your pet today?`,
      timestamp: new Date(),
      suggestedActions: [
        { type: 'booking', label: 'Book Appointment Online', urlOrNumber: PYRAMID_CLINIC_INFO.bookingUrl },
        { type: 'phone', label: 'Call 07 4056-5989', urlOrNumber: PYRAMID_CLINIC_INFO.phone }
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const speakText = (text: string) => {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Fetch from Express Gemini API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: messages })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.text,
        timestamp: new Date(),
        isOutsideFAQ: data.isOutsideFAQ,
        suggestedActions: [
          { type: 'booking', label: 'Book Appointment Online', urlOrNumber: PYRAMID_CLINIC_INFO.bookingUrl },
          { type: 'phone', label: 'Call 07 4056-5989', urlOrNumber: PYRAMID_CLINIC_INFO.phone }
        ]
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(data.text);
    } catch (err) {
      console.warn('API route call fallback to local FAQ matcher:', err);
      // Seamless local match fallback
      const localResult = matchFAQLocal(query);
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: localResult.text,
        timestamp: new Date(),
        isOutsideFAQ: localResult.isOutsideFAQ,
        faqSourceId: localResult.item?.id,
        suggestedActions: [
          { type: 'booking', label: 'Book Appointment Online', urlOrNumber: PYRAMID_CLINIC_INFO.bookingUrl },
          { type: 'phone', label: 'Call 07 4056-5989', urlOrNumber: PYRAMID_CLINIC_INFO.phone }
        ]
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(localResult.text);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Conversation cleared. How can Pyramid Veterinary Surgery assist you today?`,
        timestamp: new Date(),
        suggestedActions: [
          { type: 'booking', label: 'Book Appointment Online', urlOrNumber: PYRAMID_CLINIC_INFO.bookingUrl },
          { type: 'phone', label: 'Call 07 4056-5989', urlOrNumber: PYRAMID_CLINIC_INFO.phone }
        ]
      }
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      id="chatbot-widget-container"
      className={`flex flex-col bg-white text-slate-800 border border-slate-200/90 shadow-2xl rounded-2xl overflow-hidden transition-all duration-200 ${
        isEmbedded ? 'w-full h-full min-h-[580px]' : 'w-[380px] sm:w-[420px] h-[600px] max-h-[85vh]'
      }`}
    >
      {/* Widget Header */}
      <div id="widget-header" className="bg-emerald-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-emerald-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-md shadow-xs">
            <PyramidLogo size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm tracking-tight text-white leading-tight">
                Pyramid Vet Assistant
              </h2>
              <span className="inline-flex items-center gap-1 bg-emerald-800 text-emerald-200 text-[10px] font-medium px-2 py-0.5 rounded-full border border-emerald-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/90 font-medium">
              Gordonvale, QLD • 07 4056-5989
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            id="btn-toggle-audio"
            onClick={() => setAudioEnabled(!audioEnabled)}
            title={audioEnabled ? "Disable Read Aloud" : "Enable Read Aloud"}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            id="btn-clear-chat"
            onClick={handleClearHistory}
            title="Reset Chat"
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {!isEmbedded && onClose && (
            <button
              id="btn-close-widget"
              onClick={onClose}
              title="Close Chat"
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Persistent Quick Contact Bar */}
      <div id="quick-contact-strip" className="bg-emerald-50/90 border-b border-emerald-100 px-3 py-2 flex items-center justify-between text-xs text-emerald-900 shrink-0">
        <a
          href={PYRAMID_CLINIC_INFO.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950 hover:underline bg-white px-2.5 py-1 rounded-md border border-emerald-200 shadow-2xs transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
          <span>Book Online</span>
          <ExternalLink className="w-3 h-3 text-emerald-600" />
        </a>

        <a
          href={`tel:${PYRAMID_CLINIC_INFO.phone}`}
          className="flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950 hover:underline bg-white px-2.5 py-1 rounded-md border border-emerald-200 shadow-2xs transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>07 4056-5989</span>
        </a>
      </div>

      {/* Messages Thread */}
      <div id="chat-messages-thread" className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } space-y-1.5`}
          >
            <div className="flex items-center gap-1.5 px-1 text-[11px] text-slate-400 font-semibold tracking-wide uppercase">
              <span>{msg.sender === 'user' ? 'You' : 'Pyramid Vet Assistant'}</span>
              <span>•</span>
              <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div
              className={`max-w-[88%] p-4 rounded-2xl relative text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-100'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-xs'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Outside FAQ / Special Emergency Callout */}
              {msg.isOutsideFAQ && (
                <div className="mt-3 bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-amber-950 text-xs flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-semibold text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Outside Standard FAQ / Urgent Medical Inquiry</span>
                  </div>
                  <p className="text-amber-900/90 leading-normal">
                    For specific diagnosis, custom pricing, or urgent pet emergencies, please contact our Gordonvale clinic directly:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <a
                      href={`tel:${PYRAMID_CLINIC_INFO.phone}`}
                      className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-2xs text-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call 07 4056-5989
                    </a>
                    <a
                      href={PYRAMID_CLINIC_INFO.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg shadow-2xs text-xs transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book Appointment
                    </a>
                  </div>
                </div>
              )}

              {/* Bot Action Links */}
              {msg.sender === 'bot' && !msg.isOutsideFAQ && msg.suggestedActions && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                  <a
                    href={PYRAMID_CLINIC_INFO.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Book Online</span>
                  </a>

                  <a
                    href={`tel:${PYRAMID_CLINIC_INFO.phone}`}
                    className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-200 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call 07 4056-5989</span>
                  </a>
                </div>
              )}

              {/* Copy Button for Bot Messages */}
              {msg.sender === 'bot' && (
                <button
                  onClick={() => copyToClipboard(msg.text, msg.id)}
                  title="Copy response"
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                >
                  {copiedId === msg.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic p-3 bg-white rounded-2xl border border-slate-200 w-max shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>Consulting Pyramid Vet knowledge base...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Query Chips */}
      <div id="suggested-queries-bar" className="bg-white border-t border-slate-200 px-3 py-2.5 overflow-x-auto shrink-0 flex gap-1.5 no-scrollbar scroll-smooth">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 self-center pr-1 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          Ask:
        </span>
        {QUICK_SUGGESTIONS.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sug)}
            disabled={isLoading}
            className="shrink-0 text-xs bg-white hover:bg-slate-50 text-slate-600 hover:text-emerald-600 border border-slate-200 hover:border-emerald-500 px-3 py-1.5 rounded-full font-medium transition-all disabled:opacity-50 whitespace-nowrap"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        id="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-slate-800 text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
        />

        <button
          id="btn-send-message"
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white p-2.5 rounded-xl font-medium transition-all shadow-md shadow-emerald-100 flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
