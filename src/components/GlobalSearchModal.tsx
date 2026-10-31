import React, { useState, useEffect, useRef } from 'react';
import { useHospital } from '../context/HospitalContext';
import { performGlobalSearch, SearchResultItem } from '../utils/hospitalLogic';
import { doctorsData, departmentsData, medicalServicesData, blogPostsData } from '../data/hospitalData';
import { PageRoute } from '../types';
import { Search, X, User, HeartPulse, Stethoscope, BookOpen, ChevronRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { 
    language, 
    t, 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    navigateTo 
  } = useHospital();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const found = performGlobalSearch(query, doctorsData, departmentsData, medicalServicesData, blogPostsData);
      setResults(found);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isSearchModalOpen) return null;

  const handleSelect = (item: SearchResultItem) => {
    setIsSearchModalOpen(false);
    navigateTo(item.targetPage as PageRoute, { id: item.targetId });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'doctor': return <User className="w-4 h-4 text-[#1769D2]" />;
      case 'department': return <HeartPulse className="w-4 h-4 text-[#0E9F92]" />;
      case 'service': return <Stethoscope className="w-4 h-4 text-amber-500" />;
      case 'blog': return <BookOpen className="w-4 h-4 text-purple-500" />;
      default: return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length >= 2 ? (
            results.length > 0 ? (
              <div className="space-y-1">
                {results.map((res) => (
                  <button
                    key={`${res.type}-${res.id}`}
                    onClick={() => handleSelect(res)}
                    className="w-full text-left p-3 rounded-xl hover:bg-blue-50/70 flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                        {getIcon(res.type)}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#1769D2]">
                          {language === 'bn' ? res.titleBn : res.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {language === 'bn' ? res.subtitleBn : res.subtitleEn}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1769D2] transition-colors" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No matching doctors, tests or services found.'}
              </div>
            )
          ) : (
            <div className="p-4 text-xs text-slate-400 text-center">
              {language === 'bn' 
                ? 'ডাক্তার, বিভাগ, পরীক্ষা বা ব্লগের নাম লিখুন...' 
                : 'Type at least 2 characters to search across doctors, departments, and tests.'}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
