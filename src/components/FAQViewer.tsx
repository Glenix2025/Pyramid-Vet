import React, { useState } from 'react';
import { FAQ_KNOWLEDGE_BASE, PYRAMID_CLINIC_INFO } from '../data/faqKnowledgeBase';
import { FAQItem } from '../types';
import { Search, BookOpen, MessageSquare, Phone, Calendar, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

interface FAQViewerProps {
  onTestQuestion: (question: string) => void;
}

const CATEGORIES = ['All', 'Services', 'Surgical', 'Wellbeing', 'Preventive', 'Integrative', 'Clinic Info', 'Appointments'];

export const FAQViewer: React.FC<FAQViewerProps> = ({ onTestQuestion }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = FAQ_KNOWLEDGE_BASE.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = search.trim() === '' || 
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()) ||
      item.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="faq-knowledge-hub" className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-800">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official Grounding Knowledge Base (14 Items)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Pyramid Veterinary Surgery FAQ Dataset
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          The AI chatbot operates strictly grounded in these 14 confirmed clinic facts. For any inquiry outside this knowledge base, the bot instructs clients to call <span className="font-bold text-emerald-400">07 4056-5989</span> or visit the <span className="font-bold text-emerald-400">Online Booking Page</span>.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Zero hallucinated pricing or unlisted medical services
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Automatic action routing to 07 4056-5989
          </span>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQ questions, answers, or keywords (e.g. vaccination, hours, insurance, surgery)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-emerald-100 text-emerald-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                  FAQ #{faq.id} • {faq.category}
                </span>
                <button
                  onClick={() => onTestQuestion(faq.question)}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Test in Chat</span>
                </button>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {faq.question}
              </h3>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {faq.answer}
              </p>
            </div>

            {/* Keyword tags */}
            <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-100">
              <Tag className="w-3 h-3 text-slate-400 shrink-0" />
              {faq.keywords.slice(0, 5).map((kw, i) => (
                <span key={i} className="text-[10px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-md">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ))}

        {filteredFAQs.length === 0 && (
          <div className="col-span-full bg-white p-8 rounded-2xl text-center border border-slate-200 space-y-2">
            <p className="font-bold text-slate-800">No matching FAQ entries found</p>
            <p className="text-xs text-slate-500">
              Try searching for general terms like "vaccinations", "hours", "booking", or "insurance".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
