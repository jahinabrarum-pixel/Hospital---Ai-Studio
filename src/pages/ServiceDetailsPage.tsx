import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { medicalServicesData, hospitalInfo } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  Phone, 
  ArrowLeft, 
  Calendar, 
  UserCheck 
} from 'lucide-react';

export const ServiceDetailsPage: React.FC = () => {
  const { 
    language, 
    t, 
    selectedServiceId, 
    navigateTo, 
    openAppointmentModal 
  } = useHospital();

  const service = medicalServicesData.find(s => s.id === selectedServiceId) || medicalServicesData[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: t.navServices, page: 'services' },
          { label: language === 'bn' ? service.nameBn : service.nameEn }
        ]} 
      />

      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] flex items-end">
        <img
          src={service.image}
          alt={service.nameEn}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 p-6 sm:p-12 text-white max-w-3xl space-y-3">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {service.category.toUpperCase()}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {language === 'bn' ? service.nameBn : service.nameEn}
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            {language === 'bn' ? service.shortDescBn : service.shortDescEn}
          </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Full description and features */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'সুবিধার বিস্তারিত বিবরণ' : 'Detailed Clinical Capabilities'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'bn' ? service.fullDescBn : service.fullDescEn}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'প্রধান প্রযুক্তি ও সেবাসমূহ' : 'Key Highlights & Technology'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {(language === 'bn' ? service.featuresBn : service.featuresEn).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-[#1769D2] shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Availability, Hotline, Booking */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              {language === 'bn' ? 'পরিচালনা ও সময়সূচী' : 'Operational Info'}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Clock className="w-4 h-4 text-[#1769D2]" />
                <div>
                  <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'সেবার সময়:' : 'Availability:'}</span>
                  <span className="font-semibold">{language === 'bn' ? service.availabilityBn : service.availabilityEn}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700">
                <UserCheck className="w-4 h-4 text-[#0E9F92]" />
                <div>
                  <span className="text-slate-400 block text-[11px]">{language === 'bn' ? 'দায়িত্বপ্রাপ্ত ডেস্ক:' : 'In-Charge Desk:'}</span>
                  <span className="font-semibold">{language === 'bn' ? service.inchargeBn : service.inchargeEn}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => openAppointmentModal()}
                className="w-full py-3 bg-[#1769D2] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                {t.bookAppointment}
              </button>
              
              <a
                href={`tel:${hospitalInfo.emergencyPhoneEn}`}
                className="w-full py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs rounded-xl border border-rose-200 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{hospitalInfo.emergencyPhoneEn}</span>
              </a>
            </div>
          </div>

          {/* Other Services */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              {language === 'bn' ? 'অন্যান্য চিকিৎসাসেবাসমূহ' : 'Other Medical Facilities'}
            </h4>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {medicalServicesData.filter(s => s.id !== service.id).map(other => (
                <button
                  key={other.id}
                  onClick={() => navigateTo('service-details', { id: other.id })}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-[#1769D2] transition-colors flex items-center justify-between"
                >
                  <span className="line-clamp-1">{language === 'bn' ? other.nameBn : other.nameEn}</span>
                  <span className="text-slate-400 text-[10px]">→</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigateTo('services')}
            className="w-full py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'সকল চিকিৎসাসেবায় ফিরে যান' : 'Back to Services'}</span>
          </button>

        </div>

      </div>

    </div>
  );
};
