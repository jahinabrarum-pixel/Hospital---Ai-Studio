import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { hospitalInfo } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  PhoneCall, 
  Ambulance, 
  Clock, 
  ShieldAlert, 
  HeartPulse, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Activity 
} from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const { language, t, navigateTo } = useHospital();

  const emergencySteps = [
    {
      step: '1',
      titleEn: 'Immediate Arrival & Triage',
      titleBn: 'তাৎক্ষণিক আগমন ও ট্রায়াজ',
      descEn: 'Drive directly to the Emergency Ramp at ground level. Triage officers instantly evaluate vital pulse, oxygen saturation, and consciousness.',
      descBn: 'হাসপাতালের প্রধান জরুরি র‍্যাম্পে সরাসরি আসুন। ইমার্জেন্সি মেডিকেল অফিসার তাৎক্ষণিক পালস, অক্সিজেন ও চেতনার মাত্রা মূল্যায়ন করবেন।'
    },
    {
      step: '2',
      titleEn: 'Resuscitation & Life-Support',
      titleBn: 'রিসাসিটেশন ও লাইফ সাপোর্ট',
      descEn: 'High-flow central oxygen, IV cannulation, cardiac monitor attachment, and blood glucose check within 120 seconds.',
      descBn: '১২০ সেকেন্ডের মধ্যে সেন্ট্রাল অক্সিজেন, আইভি ক্যানুলা, কার্ডিয়াক মনিটর ও ব্লাড সুগার পরীক্ষা সম্পন্ন।'
    },
    {
      step: '3',
      titleEn: 'Minor OT & Wound Care',
      titleBn: 'মাইনর ওটি ও ক্ষত ড্রেসিং',
      descEn: 'Emergency sterile suturing for road accident lacerations, fracture splinting, and bleeding stabilization.',
      descBn: 'সড়ক দুর্ঘটনার কাটা-ছেঁড়া সেলাই, ফ্র্যাকচার স্প্লিন্ট ও অতিরিক্ত রক্তক্ষরণ বন্ধে তাৎক্ষণিক ব্যবস্থা।'
    },
    {
      step: '4',
      titleEn: 'Specialist On-Call / ICU Admission',
      titleBn: 'বিশেষজ্ঞ কনসালট্যান্ট ও আইসিইউ',
      descEn: 'Rapid mobilization of on-call senior surgeons, cardiologists, or transfer to the High-Dependency ICU.',
      descBn: 'অন-কল কার্ডিওলজিস্ট বা জেনারেল সার্জন উপস্থিত হয়ে উন্নত অপারেশন বা আইসিইউ পর্যবেক্ষণে নেওয়া।'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navEmergency }]} />

      {/* Red Emergency Header Alert */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-red-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-rose-200">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>{language === 'bn' ? 'সার্বক্ষণিক ২৪/৭ ইমার্জেন্সি রেসপন্স' : '24/7 Red-Alert Trauma & Resuscitation'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {t.emergencyTitle}
            </h1>
            <p className="text-sm sm:text-base text-rose-100 leading-relaxed">
              {t.emergencySub}
            </p>
          </div>

          {/* Quick Call Box */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3 shrink-0">
            <p className="text-xs text-rose-200 font-bold uppercase tracking-wider">
              {language === 'bn' ? 'জরুরি ট্রমা ও কার্ডিয়াক কল:' : 'Emergency Trauma Hotline:'}
            </p>
            <a
              href={`tel:${hospitalInfo.emergencyPhoneEn}`}
              className="text-2xl sm:text-3xl font-black text-white hover:text-rose-200 block transition-colors"
            >
              {hospitalInfo.emergencyPhoneEn}
            </a>
            <a
              href={`tel:${hospitalInfo.emergencyPhoneEn}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-rose-700 font-bold text-xs rounded-xl hover:bg-rose-50 shadow-lg transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>{language === 'bn' ? 'এখনই কল করুন' : 'Call Now (Toll Free)'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ambulance Dispatch Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Ambulance className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'bn' ? '২৪ ঘণ্টা কার্ডিয়াক ও অক্সিজেনযুক্ত অ্যাম্বুলেন্স' : '24/7 Rapid Ambulance Fleet'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'bn' 
                ? 'দেবীদ্বার, মুরাদনগর, চান্দিনা ও কুমিল্লা অঞ্চলে অবিলম্বে রোগী পরিবহনে প্রস্তুত।' 
                : 'Oxygen-equipped vehicles covering Debidwar, Muradnagar, Chandina and tertiary transfers to Dhaka.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${hospitalInfo.ambulancePhoneEn}`}
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{hospitalInfo.ambulancePhoneEn}</span>
          </a>
        </div>
      </div>

      {/* Emergency Arrival Protocol Steps */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.emergencySteps}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'bn' ? 'রোগী পৌঁছানোর সাথে সাথে দ্রুত চিকিৎসার সুনির্দিষ্ট প্রটোকল' : 'Structured trauma protocol executed upon patient arrival'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {emergencySteps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 font-black text-sm flex items-center justify-center">
                0{step.step}
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'bn' ? step.titleBn : step.titleEn}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'bn' ? step.descBn : step.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* What to Bring & Preparedness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
            <span>{t.whatToBring}</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>• {language === 'bn' ? 'রোগীর নিয়মিত সকল প্রেসক্রিপশন ও চলতি ওষুধের পাতা।' : 'Current prescription list or ongoing medication strips.'}</li>
            <li>• {language === 'bn' ? 'রোগীর জাতীয় পরিচয়পত্র বা জন্মনিবন্ধন ও রক্তের গ্রুপ জানা থাকলে তা জানান।' : 'Patient photo ID and prior blood group card if available.'}</li>
            <li>• {language === 'bn' ? 'বিষক্রিয়া বা সাপে কাটার ক্ষেত্রে কী ধরনের বিষ বা সাপের চিহ্ন দেখা গেছে তা ডাক্তারকে জানান।' : 'Details on substance or animal if poisoning/snakebite is suspected.'}</li>
            <li>• {language === 'bn' ? 'সড়ক দুর্ঘটনার ক্ষেত্রে আঘাতের স্থান ও ঘটনার সংক্ষিপ্ত সময় চিকিৎসকে জানান।' : 'Time of accident and immediate trauma impact description.'}</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 text-[#1769D2]">
            <MapPin className="w-5 h-5" />
            <span>{language === 'bn' ? 'জরুরি বিভাগে আসার দিকনির্দেশনা' : 'Emergency Ramp Directions'}</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'bn' 
              ? 'দেবীদ্বার নিউ মার্কেট পার হয়ে হাসপাতাল রোডের মূল ফটকে গাড়ি প্রবেশ করালে সরাসরি গ্রাউন্ড ফ্লোর ইমার্জেন্সি র‍্যাম্পে থামুন। হুইলচেয়ার ও ট্রলি প্রস্তুত রাখা থাকে।' 
              : 'Enter through the main hospital gateway off Hospital Road in Debidwar Bazar. The emergency ramp has immediate stretcher trolley access 24/7.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('contact')}
              className="text-xs font-semibold text-[#1769D2] hover:underline"
            >
              {language === 'bn' ? 'গুগল ম্যাপে পূর্ণাঙ্গ রুট দেখুন →' : 'View Google Map Route & Directions →'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
