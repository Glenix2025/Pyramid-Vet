import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { WebsiteMockup } from './components/WebsiteMockup';
import { ChatWidget } from './components/ChatWidget';
import { FAQViewer } from './components/FAQViewer';
import { PyramidLogo } from './components/PyramidLogo';
import { PYRAMID_CLINIC_INFO, FAQ_KNOWLEDGE_BASE } from './data/faqKnowledgeBase';
import { 
  Phone, Calendar, MapPin, Clock, MessageSquare, BookOpen, ShieldCheck, 
  ExternalLink, Sparkles, CheckCircle2, HelpCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'website' | 'widget-only' | 'faq-base'>('website');
  const [sandboxInitialQuery, setSandboxInitialQuery] = useState<string | undefined>();

  const handleTestQuestionFromFAQ = (question: string) => {
    setSandboxInitialQuery(question);
    setActiveTab('widget-only');
  };

  return (
    <div id="pyramid-vet-app" className="min-h-screen bg-slate-100/80 text-slate-900 font-sans flex flex-col antialiased">
      {/* Top Header */}
      <HeaderNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'website' && <WebsiteMockup />}

        {activeTab === 'widget-only' && (
          <div id="sandbox-view" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Sandbox Details Panel */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <PyramidLogo size={40} showText />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-extrabold text-lg text-slate-900 leading-tight">
                      Chatbot Testing & Integration Sandbox
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Test Pyramid Veterinary Surgery's client-facing chatbot assistant. The model answers client queries strictly from the 14-item clinic FAQ knowledge base and provides direct contact actions.
                    </p>
                  </div>

                  <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100 space-y-2.5 text-xs text-emerald-950">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Strict FAQ Grounding Rules</span>
                    </div>
                    <ul className="space-y-1.5 text-emerald-900/90 list-disc pl-4 font-medium">
                      <li>Answers strictly from the 14 FAQ items.</li>
                      <li>For unlisted topics or medical advice, directs client: <span className="font-bold text-emerald-950">"Please call us on 07 4056-5989"</span>.</li>
                      <li>Surfaces direct phone link & online booking link as persistent clickable actions.</li>
                    </ul>
                  </div>

                  {/* Clinic Quick Info Card */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Phone: 07 4056-5989 (After-Hours as well)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                      <a href={PYRAMID_CLINIC_INFO.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-800 hover:underline flex items-center gap-1">
                        <span>Book Appointment Online</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>181–183 Dempsey Street, Gordonvale, QLD 4865</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Mon–Fri 7:30am–1:30pm, Sat 8am–11:30am</span>
                    </div>
                  </div>
                </div>

                {/* Quick Prompt Selector */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-emerald-700" />
                    <span>Try Common Test Prompts</span>
                  </h3>
                  <div className="space-y-1.5">
                    {[
                      "What services do you offer?",
                      "What are your opening hours?",
                      "Where are you located?",
                      "How do I book an appointment?",
                      "Do you have an after-hours service?",
                      "Do you accept pet insurance?",
                      "What surgical procedures do you do?",
                      "Do you offer acupuncture or laser therapy?",
                      "Can I get my dog's medication renewed?",
                      "My cat ate chocolate, what should I do?"
                    ].map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSandboxInitialQuery(q)}
                        className="w-full text-left text-xs bg-slate-50 hover:bg-emerald-50 hover:text-emerald-950 p-2.5 rounded-xl border border-slate-200/80 font-medium transition-colors flex items-center justify-between group"
                      >
                        <span>{q}</span>
                        <Sparkles className="w-3 h-3 text-slate-400 group-hover:text-emerald-700" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Chatbot Canvas */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-xl">
                  <ChatWidget
                    isEmbedded={true}
                    initialQuery={sandboxInitialQuery}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq-base' && (
          <FAQViewer onTestQuestion={handleTestQuestionFromFAQ} />
        )}
      </main>
    </div>
  );
}
