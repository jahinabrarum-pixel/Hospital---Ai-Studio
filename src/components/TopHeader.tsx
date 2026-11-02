import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { hospitalInfo } from '../data/hospitalData';
import { Phone, Clock, MapPin, Ambulance } from 'lucide-react';

export const TopHeader: React.FC = () => {
  const { language, t, navigateTo } = useHospital();

  return (
    <div className="bg-[#142B45] text-white/90 text-xs sm:text-sm py-2 px-4 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left side: Location and Hours */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#0E9F92] shrink-0" />
            <span>{language === 'bn' ? hospitalInfo.locationBn : hospitalInfo.locationEn}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-[#0E9F92] shrink-0" />
            <span className="font-medium text-emerald-400">
              {language === 'bn' ? 'জরুরি বিভাগ ২৪/৭ খোলা' : '24/7 Emergency Care'}
            </span>
          </div>
        </div>

        {/* Right side: Emergency Hotline & Ambulance */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('emergency')}
            className="flex items-center gap-1.5 text-rose-300 hover:text-white transition-colors cursor-pointer"
            title="Emergency Care"
          >
            <Ambulance className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="font-semibold">
              {language === 'bn' ? hospitalInfo.ambulancePhoneBn : hospitalInfo.ambulancePhoneEn}
            </span>
          </button>

          <a
            href={`tel:${hospitalInfo.emergencyPhoneEn.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 bg-rose-600/30 text-rose-200 hover:bg-rose-600 hover:text-white px-2.5 py-1 rounded transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="font-bold">
              {language === 'bn' ? 'হটলাইন: ০১৮১৯-৯৮৭৬৫৪' : 'Hotline: 01819-987654'}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
