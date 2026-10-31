import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { faqData, hospitalInfo } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search, ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { language, t } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(faqData[0]?.id || null);

  const filteredFaqs = faqData.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = !searchQuery ||
      item.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.questionBn.includes(searchQuery) ||
      item.answerEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answerBn.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navFaq }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-4">
        <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
          {language === 'bn' ? 'সাধারণ জিজ্ঞাসা ও উত্তর' : 'Frequently Asked Questions'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Hospital FAQs & Patient Guidance'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          {language === 'bn'
            ? 'ডাক্তারের সিরিয়াল, ল্যাব টেস্ট, রোগী ভর্তি ও জরুরি সেবা সম্পর্কিত সাধারণ প্রশ্নের উত্তর জেনে নিন।'
            : 'Find clear answers to common questions about appointments, laboratory tests, visiting rules, and ambulance transport.'}
        </p>

        {/* Search input */}
        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'প্রশ্ন লিখে খুঁজুন...' : 'Search questions...'}
            className="w-full text-xs pl-10 pr-4 py-3 bg-white text-slate-800 rounded-xl focus:outline-none shadow-md"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'all', labelEn: 'All Questions', labelBn: 'সকল প্রশ্ন' },
          { id: 'appointment', labelEn: 'Appointments & Doctors', labelBn: 'সিরিয়াল ও ডাক্তার' },
          { id: 'emergency', labelEn: 'Emergency & Ambulance', labelBn: 'জরুরি সেবা ও অ্যাম্বুলেন্স' },
          { id: 'diagnostic', labelEn: 'Lab Tests & Reports', labelBn: 'ল্যাব ও টেস্ট' },
          { id: 'billing', labelEn: 'Billing & Admission', labelBn: 'বিল ও ভর্তি' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#1769D2] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {language === 'bn' ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map(faq => {
          const isOpen = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-[#1769D2] cursor-pointer"
              >
                <span>{language === 'bn' ? faq.questionBn : faq.questionEn}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1769D2]' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-1 animate-in fade-in duration-150">
                  <p className="pt-3">{language === 'bn' ? faq.answerBn : faq.answerEn}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center space-y-3">
        <h4 className="font-bold text-slate-800 text-sm">
          {language === 'bn' ? 'আপনার প্রশ্নের উত্তর খুঁজে পাননি?' : 'Still Have Questions?'}
        </h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {language === 'bn' ? 'আমাদের ২৪/৭ তথ্য সহায়তা ডেস্কে সরাসরি কল করুন।' : 'Call our 24/7 patient information desk directly.'}
        </p>
        <a
          href={`tel:${hospitalInfo.phoneEn}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1769D2] text-white text-xs font-semibold rounded-xl hover:bg-blue-600 shadow-xs"
        >
          <PhoneCall className="w-4 h-4" />
          <span>{hospitalInfo.phoneEn}</span>
        </a>
      </div>

    </div>
  );
};
