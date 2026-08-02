import React, { useState } from 'react';
import { PyramidLogo } from './PyramidLogo';
import { PYRAMID_CLINIC_INFO, FAQ_KNOWLEDGE_BASE } from '../data/faqKnowledgeBase';
import { ChatWidget } from './ChatWidget';
import { 
  Phone, Calendar, MapPin, Clock, ShieldCheck, Heart, Stethoscope, 
  Sparkles, ExternalLink, MessageSquare, ChevronRight, Facebook, CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const WebsiteMockup: React.FC = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(true);
  const [selectedInitialQuery, setSelectedInitialQuery] = useState<string | undefined>();

  const triggerChatWithQuery = (query: string) => {
    setSelectedInitialQuery(query);
    setIsWidgetOpen(true);
  };

  return (
    <div id="website-mockup-wrapper" className="min-h-screen bg-slate-100/70 font-sans text-slate-800 relative pb-20">
      {/* Top Banner Notice */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">181–183 Dempsey Street, Gordonvale, QLD 4865</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Mon–Fri 7:30am–1:30pm | Sat 8am–11:30am
            </span>
            <span>•</span>
            <a href={`tel:${PYRAMID_CLINIC_INFO.phone}`} className="hover:underline flex items-center gap-1 font-bold text-white">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              07 4056-5989 (Inc. After-Hours)
            </a>
          </div>
        </div>
      </div>

      {/* Main Website Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PyramidLogo size={42} showText textColor="text-slate-900" />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#services" className="hover:text-emerald-700 transition-colors">Services</a>
            <a href="#surgical" className="hover:text-emerald-700 transition-colors">Surgical</a>
            <a href="#wellbeing" className="hover:text-emerald-700 transition-colors">Wellbeing</a>
            <a href="#integrative" className="hover:text-emerald-700 transition-colors">Integrative Therapy</a>
            <a href="#hours" className="hover:text-emerald-700 transition-colors">Hours & Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${PYRAMID_CLINIC_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 font-bold text-sm text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>07 4056-5989</span>
            </a>

            <a
              href={PYRAMID_CLINIC_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Online</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-950 text-emerald-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-800/80">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gordonvale's Local Veterinary Surgery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              Pyramid Veterinary Surgery
            </h1>

            <p className="text-emerald-400 font-semibold text-lg">
              Personalised service & quality care
            </p>

            <p className="text-slate-300 text-base max-w-2xl font-normal leading-relaxed">
              Pyramid Veterinary Surgery delivers modern, professional and affordable health care for dogs, cats, and small animals across Gordonvale and surrounding communities.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={PYRAMID_CLINIC_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-emerald-950 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </a>

              <a
                href={`tel:${PYRAMID_CLINIC_INFO.phone}`}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-700 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call 07 4056-5989</span>
              </a>
            </div>

            {/* Quick Tag Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300 font-medium border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cat & Dog Vaccinations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Desexing & Dentistry</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Laser & Acupuncture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Parasite Prevention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Medication Renewal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>After-Hours Support</span>
              </div>
            </div>
          </div>

          {/* Hero Feature Box */}
          <div className="md:col-span-5">
            <div className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-tight">Need Quick Advice?</h3>
                    <p className="text-xs text-slate-500">Ask our AI Clinic Assistant</p>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full">
                  Instant Answers
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Tap any common question below to ask our client chatbot or open the assistant widget:
              </p>

              <div className="space-y-2">
                {[
                  "What are your opening hours?",
                  "Where are you located in Gordonvale?",
                  "How do I book an appointment?",
                  "What surgical services do you provide?",
                  "Do you accept pet insurance?"
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerChatWithQuery(q)}
                    className="w-full text-left text-xs bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 p-3 rounded-xl flex items-center justify-between group transition-all font-medium"
                  >
                    <span>{q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsWidgetOpen(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Open Full Chatbot Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Pet Care Services
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            From routine wellness checks to specialized surgical procedures, our team provides quality care for your beloved animals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Health Checks & Vaccinations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cat and dog vaccinations, thorough physical health checks, clinical pathology, microchipping, and specialist referrals.
            </p>
            <button
              onClick={() => triggerChatWithQuery("What services does Pyramid Veterinary Surgery offer?")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
            >
              <span>Ask Chatbot about Vaccinations</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service Card 2 */}
          <div id="surgical" className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Surgical Procedures</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Desexing, dentistry, soft tissue surgery, ophthalmic (eye) surgery, and emergency procedures handled with high standard care.
            </p>
            <button
              onClick={() => triggerChatWithQuery("What surgical services do you provide?")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
            >
              <span>Ask Chatbot about Surgery</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service Card 3 */}
          <div id="wellbeing" className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Wellbeing & Behaviour</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Behavioural advice, nutritional advice, boarding guidance, cat & dog care advice, and routine nail clipping.
            </p>
            <button
              onClick={() => triggerChatWithQuery("What wellbeing services do you offer?")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
            >
              <span>Ask Chatbot about Wellbeing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Preventive Care</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Comprehensive protection and treatments for heartworm, intestinal worm, flea and tick, and mite control.
            </p>
            <button
              onClick={() => triggerChatWithQuery("Do you offer preventive care?")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
            >
              <span>Ask Chatbot about Parasite Control</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service Card 5 */}
          <div id="integrative" className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Integrative & Laser Therapy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alternative therapies including veterinary acupuncture, electroacupuncture, and low level laser therapy.
            </p>
            <button
              onClick={() => triggerChatWithQuery("Do you offer any alternative or integrative treatments?")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
            >
              <span>Ask Chatbot about Laser Therapy</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Service Card 6 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Medication & Referrals</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Medication renewal service for ongoing conditions and specialist referrals when specialized hospital care is required.
            </p>
            <button
              onClick={() => triggerChatWithQuery("Can I get medications renewed?")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 pt-1"
            >
              <span>Ask Chatbot about Scripts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Location & Opening Hours Card */}
      <section id="hours" className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl grid md:grid-cols-2 gap-8 items-center border border-emerald-800">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-900 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-800">
              <MapPin className="w-3.5 h-3.5" />
              <span>Gordonvale, QLD 4865</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Location & Opening Hours
            </h2>

            <div className="space-y-3 text-sm text-emerald-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">181–183 Dempsey Street</p>
                  <p className="text-emerald-200">Gordonvale, QLD 4865, Australia</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Opening Hours:</p>
                  <p className="text-emerald-200">Monday – Friday: 7:30am – 1:30pm</p>
                  <p className="text-emerald-200">Saturday: 8:00am – 11:30am</p>
                  <p className="text-emerald-300/80">Closed Sunday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Phone & After-Hours:</p>
                  <a href={`tel:${PYRAMID_CLINIC_INFO.phone}`} className="text-amber-300 hover:underline font-bold text-base">
                    07 4056-5989
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={PYRAMID_CLINIC_INFO.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </a>

              <a
                href={PYRAMID_CLINIC_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-900/90 hover:bg-emerald-900 text-emerald-200 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-700 transition-colors"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook Page</span>
              </a>
            </div>
          </div>

          {/* Map & Direction Card */}
          <div className="bg-emerald-900/80 border border-emerald-800 rounded-2xl p-5 space-y-4 text-xs text-emerald-100">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Gordonvale Clinic Map Directions</span>
            </h3>

            <div className="bg-emerald-950 p-4 rounded-xl border border-emerald-800 space-y-2">
              <p className="text-emerald-200 font-medium">
                Conveniently located on Dempsey Street in Gordonvale, providing easy parking and accessible ground-floor entry for pet owners.
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Pyramid Veterinary Surgery 181-183 Dempsey Street Gordonvale QLD 4865")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-300 font-bold hover:underline text-xs"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/80 flex items-center justify-between text-emerald-200">
              <span className="font-semibold">Pet Insurance Question?</span>
              <button
                onClick={() => triggerChatWithQuery("Do you accept pet insurance?")}
                className="bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg"
              >
                Ask Assistant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chatbot Trigger Button (Bottom-Right) */}
      {!isWidgetOpen && (
        <button
          id="btn-open-floating-chat"
          onClick={() => setIsWidgetOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-emerald-800 hover:bg-emerald-900 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all transform hover:scale-105 border-2 border-white group"
        >
          <div className="relative">
            <PyramidLogo size={28} />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-emerald-900 animate-ping" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <p className="font-extrabold text-xs leading-none text-white">Ask Pyramid Vet AI</p>
            <p className="text-[10px] text-emerald-200 font-medium leading-tight">Instant FAQ Answers</p>
          </div>
        </button>
      )}

      {/* Floating Chatbot Drawer Modal */}
      {isWidgetOpen && (
        <div id="floating-chat-modal" className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <ChatWidget
            isEmbedded={false}
            onClose={() => setIsWidgetOpen(false)}
            initialQuery={selectedInitialQuery}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 sm:px-6 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-bold text-slate-200">Pyramid Veterinary Surgery • Gordonvale, QLD</p>
            <p className="text-slate-500">181–183 Dempsey Street, Gordonvale, QLD 4865 • Tel: 07 4056-5989</p>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <a href={PYRAMID_CLINIC_INFO.bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Book Online
            </a>
            <span>•</span>
            <a href={PYRAMID_CLINIC_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
