import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { hospitalInfo } from '../data/hospitalData';
import { Home, Stethoscope, Ambulance, Search, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language, t, navigateTo, setIsSearchModalOpen } = useHospital();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
      
      <div className="inline-block p-4 rounded-3xl bg-blue-50 text-[#1769D2] mb-2 font-mono text-6xl font-black">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {language === 'bn' ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          {language === 'bn'
            ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা ঠিকানাটি ভুল হতে পারে। নিচের প্রয়োজনীয় লিংকগুলোতে ক্লিক করুন।'
            : 'The medical page or resource you requested could not be located. You can navigate back to the main portal or contact our hospital helpline.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-[#1769D2] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>{t.backToHome}</span>
        </button>

        <button
          onClick={() => navigateTo('doctors')}
          className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <Stethoscope className="w-4 h-4 text-[#1769D2]" />
          <span>{t.findDoctor}</span>
        </button>

        <button
          onClick={() => navigateTo('emergency')}
          className="px-5 py-3 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <Ambulance className="w-4 h-4 text-rose-600" />
          <span>{t.navEmergency}</span>
        </button>

        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="px-4 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>{language === 'bn' ? 'সার্চ করুন' : 'Search'}</span>
        </button>
      </div>

      <div className="pt-8 border-t border-slate-200 text-xs text-slate-400">
        <p>{hospitalInfo.nameEn} • {hospitalInfo.locationEn}</p>
        <p className="mt-1">Hotline: {hospitalInfo.phoneEn} | Emergency: {hospitalInfo.emergencyPhoneEn}</p>
      </div>

    </div>
  );
};
