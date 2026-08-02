import React from 'react';
import { PyramidLogo } from './PyramidLogo';
import { PYRAMID_CLINIC_INFO } from '../data/faqKnowledgeBase';
import { MessageSquare, Layout, BookOpen, Phone, Calendar, ExternalLink } from 'lucide-react';

interface HeaderNavProps {
  activeTab: 'website' | 'widget-only' | 'faq-base';
  setActiveTab: (tab: 'website' | 'widget-only' | 'faq-base') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header id="main-app-header" className="bg-white text-slate-900 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Urgent Notice Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-200">Gordonvale, QLD Vet Clinic:</span>
          <span className="hidden sm:inline text-slate-300">Mon–Fri 7:30am–1:30pm | Sat 8am–11:30am</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${PYRAMID_CLINIC_INFO.phone}`}
            className="hover:text-white flex items-center gap-1.5 font-bold text-emerald-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>07 4056-5989</span>
          </a>
          <span className="text-slate-700">|</span>
          <a
            href={PYRAMID_CLINIC_INFO.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-1 font-bold text-slate-200 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Book Online</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <PyramidLogo size={36} />
          </div>
          <div>
            <h1 id="app-title-heading" className="font-extrabold text-lg leading-tight tracking-tight text-slate-900">
              {PYRAMID_CLINIC_INFO.name}
            </h1>
            <p className="text-xs text-emerald-700 font-semibold tracking-wide">
              Personalised service & quality care
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav id="view-mode-nav" className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium">
          <button
            id="tab-website-view"
            onClick={() => setActiveTab('website')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
              activeTab === 'website'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Live Website Preview</span>
          </button>

          <button
            id="tab-widget-view"
            onClick={() => setActiveTab('widget-only')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'widget-only'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chatbot Sandbox</span>
          </button>

          <button
            id="tab-faq-view"
            onClick={() => setActiveTab('faq-base')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'faq-base'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>14 FAQ Knowledge Base</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
