import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { medicalServicesData } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Stethoscope, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Ambulance, 
  FlaskConical, 
  Layers 
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { language, t, navigateTo } = useHospital();
  const [filterCategory, setFilterCategory] = useState<'all' | 'clinical' | 'emergency' | 'diagnostic' | 'support'>('all');

  const filteredServices = filterCategory === 'all'
    ? medicalServicesData
    : medicalServicesData.filter(s => s.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navServices }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'চিকিৎসাসেবা ও সুযোগ-সুবিধা' : 'Medical Services & Modern Facilities'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'bn' ? 'হাসপাতালের সকল চিকিৎসাসেবা' : 'Comprehensive Clinical & Emergency Services'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'সার্বক্ষণিক জরুরি সেবা, আধুনিক ল্যাব, শীতাতপ নিয়ন্ত্রিত কেবিন ও জীবাণুমুক্ত অপারেশন থিয়েটার সম্বলিত নির্ভরযোগ্য চিকিৎসাসেবা।'
              : 'Round-the-clock emergency trauma support, ICU, modern laminar OTs, and diagnostic laboratories designed with clinical excellence.'}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'all', labelEn: 'All Services (14)', labelBn: 'সকল সেবাসমূহ (১৪)' },
          { id: 'emergency', labelEn: 'Emergency & Critical Care', labelBn: 'জরুরি ও ক্রিটিক্যাল কেয়ার' },
          { id: 'clinical', labelEn: 'Inpatient & Clinical', labelBn: 'ইনডোর ও সার্জিক্যাল সেবা' },
          { id: 'diagnostic', labelEn: 'Diagnostic & Imaging', labelBn: 'ডায়াগনস্টিক ও রেডিওলজি' },
          { id: 'support', labelEn: 'Pharmacy & Ambulance', labelBn: 'ফার্মেসি ও অ্যাম্বুলেন্স' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterCategory === cat.id
                ? 'bg-[#1769D2] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {language === 'bn' ? cat.labelBn : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div
            key={service.id}
            onClick={() => navigateTo('service-details', { id: service.id })}
            className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1769D2] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {service.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {language === 'bn' ? service.availabilityBn : service.availabilityEn}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-[#1769D2] transition-colors">
                  {language === 'bn' ? service.nameBn : service.nameEn}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {language === 'bn' ? service.shortDescBn : service.shortDescEn}
                </p>

                <div className="pt-2 space-y-1">
                  {(language === 'bn' ? service.featuresBn : service.featuresEn).slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1769D2]" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-3 pt-3 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1769D2]">
                {language === 'bn' ? 'বিস্তারিত সুবিধা দেখুন' : 'Explore Service'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1769D2] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
