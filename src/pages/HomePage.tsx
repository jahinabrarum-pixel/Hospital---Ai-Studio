import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { 
  departmentsData, 
  doctorsData, 
  medicalServicesData, 
  healthPackagesData, 
  blogPostsData, 
  testimonialsData, 
  hospitalInfo 
} from '../data/hospitalData';
import { 
  HeartPulse, 
  PhoneCall, 
  Calendar, 
  Stethoscope, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  Ambulance, 
  Award, 
  Star, 
  ArrowRight,
  Activity,
  Bed,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t, navigateTo, openAppointmentModal } = useHospital();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-[#142B45] via-[#173a61] to-[#0d5ca0] text-white overflow-hidden py-16 sm:py-24">
        {/* Subtle background graphic pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#0E9F92]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline, Subtitle, Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{language === 'bn' ? 'দেবীদ্বার, কুমিল্লায় সর্বাধুনিক চিকিৎসাসেবা' : 'Premier Hospital in Debidwar, Cumilla'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                {t.tagline}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {t.taglineSub}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => openAppointmentModal()}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#1769D2] to-[#0E9F92] hover:brightness-110 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.bookAppointment}</span>
                </button>

                <button
                  onClick={() => navigateTo('doctors')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-xl backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-300" />
                  <span>{t.findDoctor}</span>
                </button>

                <button
                  onClick={() => navigateTo('emergency')}
                  className="px-5 py-3.5 bg-rose-600/90 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Ambulance className="w-4 h-4 text-rose-200 animate-pulse" />
                  <span>{language === 'bn' ? 'জরুরি সেবা ২৪/৭' : '24/7 Emergency'}</span>
                </button>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0E9F92]" />
                  <span>{language === 'bn' ? 'স্বাস্থ্য অধিদপ্তর অনুমোদিত' : 'DGHS Govt Approved'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? '২৪ ঘণ্টা জরুরি ল্যাব ও অক্সিজেন' : '24/7 Critical Triage'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>{language === 'bn' ? 'অভিজ্ঞ বিশেষজ্ঞ চিকিৎসক' : 'Certified Consultants'}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80"
                  alt="Debidwar Medilab Hospital Building and Modern Facility"
                  className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay floating badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl text-slate-800 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1769D2] flex items-center justify-center shrink-0">
                      <Ambulance className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {language === 'bn' ? 'জরুরি প্রয়োজনে তাৎক্ষণিক অ্যাম্বুলেন্স' : 'Immediate Emergency Helpline'}
                      </p>
                      <a href={`tel:${hospitalInfo.emergencyPhoneEn}`} className="text-sm font-bold text-rose-600 hover:underline">
                        {hospitalInfo.emergencyPhoneEn}
                      </a>
                    </div>
                  </div>
                  <span className="text-xs bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-full border border-rose-200">
                    24/7
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Quick Access Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div 
            onClick={() => navigateTo('emergency')}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border-t-4 border-rose-500 border-x border-b border-slate-100 transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <Ambulance className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1.5 group-hover:text-rose-600 transition-colors">
              {t.card1Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {t.card1Desc}
            </p>
            <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              <span>{t.learnMore}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => navigateTo('doctors')}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border-t-4 border-[#1769D2] border-x border-b border-slate-100 transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769D2] flex items-center justify-center mb-4 group-hover:bg-[#1769D2] group-hover:text-white transition-colors">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1.5 group-hover:text-[#1769D2] transition-colors">
              {t.card2Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {t.card2Desc}
            </p>
            <span className="text-xs font-semibold text-[#1769D2] flex items-center gap-1">
              <span>{t.findDoctor}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => navigateTo('diagnostics')}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border-t-4 border-[#0E9F92] border-x border-b border-slate-100 transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0E9F92] flex items-center justify-center mb-4 group-hover:bg-[#0E9F92] group-hover:text-white transition-colors">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1.5 group-hover:text-[#0E9F92] transition-colors">
              {t.card3Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {t.card3Desc}
            </p>
            <span className="text-xs font-semibold text-[#0E9F92] flex items-center gap-1">
              <span>{t.learnMore}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div 
            onClick={() => navigateTo('packages')}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border-t-4 border-amber-500 border-x border-b border-slate-100 transition-all hover:-translate-y-1 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1.5 group-hover:text-amber-600 transition-colors">
              {t.card4Title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {t.card4Desc}
            </p>
            <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
              <span>{language === 'bn' ? 'প্যাকেজ দেখুন' : 'View Packages'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* 3. Hospital Statistics Counter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {t.statPatients}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                {t.statPatientsLabel}
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-300 tracking-tight">
                {t.statDoctors}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                {t.statDoctorsLabel}
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-300 tracking-tight">
                {t.statBeds}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                {t.statBedsLabel}
              </p>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-300 tracking-tight">
                {t.statEmergency}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 font-medium">
                {t.statEmergencyLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About Hospital Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                alt="Medical specialists consultation"
                className="w-full h-[360px] object-cover"
              />
            </div>
            {/* Experience overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1769D2] flex items-center justify-center font-black text-xl">
                  12+
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {language === 'bn' ? 'বছরের নিরবচ্ছিন্ন সেবা' : 'Years of Dedicated Care'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {language === 'bn' ? 'দেবীদ্বার ও কুমিল্লার মানুষের আস্থার প্রতীক' : 'Trusted by Cumilla families'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#1769D2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md">
              {language === 'bn' ? 'আমাদের পরিচিতি' : 'About Our Institution'}
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {language === 'bn'
                ? 'দেবীদ্বারে আধুনিক চিকিৎসাসেবায় নতুন দিগন্ত'
                : 'Advanced Healthcare Right in the Heart of Debidwar'}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'দেবীদ্বার মেডিলাব হাসপাতাল কুমিল্লা জেলার অন্যতম প্রধান পূর্ণাঙ্গ চিকিৎসাকেন্দ্র। দীর্ঘ বছর ধরে আমরা মানবিক মূল্যবোধ, আধুনিক ডায়াগনস্টিক সুবিধা এবং সুদক্ষ চিকিৎসকদের মাধ্যমে সকল শ্রেণীর মানুষের জন্য নির্ভরযোগ্য ও সাশ্রয়ী স্বাস্থ্যসেবা নিশ্চিত করে আসছি।'
                : 'Established to address the acute need for specialized medical facilities outside major metropolitan hubs, Debidwar Medilab Hospital provides comprehensive inpatient, outpatient, diagnostic, and emergency trauma coverage.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium pt-2">
              <div className="flex items-center gap-2">
                <CheckCircleIcon />
                <span>{language === 'bn' ? '১৬টি বিশেষায়িত বিভাগ' : '16 Specialized Departments'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon />
                <span>{language === 'bn' ? '২৪/৭ অটোমেটেড প্যাথলজি ল্যাব' : '24/7 Automated Pathology Lab'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon />
                <span>{language === 'bn' ? 'ল্যামিনার ফ্লো মডুলার ওটি' : 'Laminar Flow Modern OTs'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon />
                <span>{language === 'bn' ? 'অক্সিজেনসমৃদ্ধ নিজস্ব অ্যাম্বুলেন্স' : 'Oxygen-Equipped Ambulances'}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-5 py-2.5 bg-[#142B45] hover:bg-[#1769D2] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {language === 'bn' ? 'আমাদের বিস্তারিত জানুন →' : 'Learn More About Us →'}
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {t.navContact}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Featured Departments Section */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#1769D2] uppercase tracking-wider bg-blue-100/60 px-3 py-1 rounded-md">
                {language === 'bn' ? 'চিকিৎসা বিভাগ' : 'Clinical Specialties'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {t.secFeaturedDepts}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                {t.secFeaturedDeptsSub}
              </p>
            </div>

            <button
              onClick={() => navigateTo('departments')}
              className="text-xs font-semibold text-[#1769D2] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>{language === 'bn' ? 'সকল ১৬টি বিভাগ দেখুন' : 'Explore All Departments'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentsData.slice(0, 8).map(dept => (
              <div
                key={dept.id}
                onClick={() => navigateTo('department-details', { id: dept.id })}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all hover:-translate-y-1 cursor-pointer flex flex-col group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dept.image}
                    alt={dept.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold bg-[#1769D2]/90 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    {dept.roomEn}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-[#1769D2] transition-colors">
                      {language === 'bn' ? dept.nameBn : dept.nameEn}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {language === 'bn' ? dept.descriptionBn : dept.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1769D2]">
                      {language === 'bn' ? 'বিস্তারিত তথ্য' : 'View Details'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1769D2] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Featured Specialist Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#1769D2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md">
              {language === 'bn' ? 'বিশেষজ্ঞ চিকিৎসকবৃন্দ' : 'Medical Faculty'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t.secFeaturedDoctors}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {t.secFeaturedDoctorsSub}
            </p>
          </div>

          <button
            onClick={() => navigateTo('doctors')}
            className="text-xs font-semibold text-[#1769D2] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{language === 'bn' ? 'সকল ডাক্তারের তালিকা ও শিডিউল' : 'View Full Doctors Directory'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctorsData.slice(0, 8).map(doctor => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all hover:-translate-y-1 flex flex-col"
            >
              <div 
                className="relative h-60 overflow-hidden cursor-pointer bg-slate-100"
                onClick={() => navigateTo('doctor-details', { id: doctor.id })}
              >
                <img
                  src={doctor.image}
                  alt={doctor.nameEn}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#1769D2] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {language === 'bn' ? doctor.departmentBn : doctor.departmentEn}
                </div>
                {doctor.isAvailableToday && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>{language === 'bn' ? 'আজ উপস্থিত' : 'Available Today'}</span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 
                    onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                    className="font-bold text-slate-900 text-base hover:text-[#1769D2] transition-colors cursor-pointer"
                  >
                    {language === 'bn' ? doctor.nameBn : doctor.nameEn}
                  </h3>
                  <p className="text-xs font-medium text-[#1769D2] mt-0.5">
                    {language === 'bn' ? doctor.degreesBn : doctor.degreesEn}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {language === 'bn' ? doctor.titleBn : doctor.titleEn}
                  </p>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] space-y-1 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{language === 'bn' ? 'সময়সূচী:' : 'Schedule:'}</span>
                    <span className="font-semibold text-slate-700">{language === 'bn' ? doctor.visitingDaysBn : doctor.visitingDaysEn}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{language === 'bn' ? 'সময়:' : 'Timing:'}</span>
                    <span className="font-semibold text-slate-700">{language === 'bn' ? doctor.visitingTimeBn : doctor.visitingTimeEn}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => openAppointmentModal(doctor.id, doctor.departmentId)}
                    className="flex-1 py-2 bg-[#1769D2] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg text-center transition-colors shadow-2xs"
                  >
                    {t.bookAppointment}
                  </button>
                  <button
                    onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                    className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg transition-colors"
                    title="Profile Details"
                  >
                    {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Health Packages Highlight */}
      <section className="bg-gradient-to-br from-slate-900 to-[#142B45] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
              {language === 'bn' ? 'প্রিভেন্টিভ কেয়ার' : 'Preventive Healthcare'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t.packageTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.packageSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthPackagesData.slice(0, 3).map(pkg => (
              <div
                key={pkg.id}
                className="bg-white/95 text-slate-800 rounded-2xl p-6 shadow-xl border border-white/20 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#1769D2] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {language === 'bn' ? pkg.badgeBn : pkg.badgeEn}
                    </span>
                    <span className="text-xs text-slate-400">
                      {pkg.testsCount} {language === 'bn' ? 'টি টেস্ট' : 'Tests'}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg">
                    {language === 'bn' ? pkg.nameBn : pkg.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {language === 'bn' ? pkg.taglineBn : pkg.taglineEn}
                  </p>

                  <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#1769D2]">
                      ৳{pkg.priceBdt}
                    </span>
                    {pkg.originalPriceBdt && (
                      <span className="text-xs text-slate-400 line-through">
                        ৳{pkg.originalPriceBdt}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    {(language === 'bn' ? pkg.testsIncludedBn : pkg.testsIncludedEn).slice(0, 4).map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircleIcon />
                        <span className="line-clamp-1">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openAppointmentModal(undefined, 'diagnostics')}
                  className="w-full py-2.5 bg-[#1769D2] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl text-center transition-colors shadow-sm"
                >
                  {t.selectThisPackage}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('packages')}
              className="text-xs font-semibold text-emerald-300 hover:text-white underline flex items-center justify-center gap-1 mx-auto"
            >
              <span>{language === 'bn' ? 'সকল ৬টি হেলথ প্যাকেজ ও মূল্য দেখুন' : 'Explore All 6 Health Screening Packages'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. Patient Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1769D2] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-md">
            {language === 'bn' ? 'আস্থা ও কৃতজ্ঞতা' : 'Patient Stories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.secTestimonialsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.secTestimonialsSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.slice(0, 3).map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{language === 'bn' ? item.quoteBn : item.quoteEn}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">
                    {language === 'bn' ? item.patientNameBn : item.patientNameEn}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {language === 'bn' ? item.locationBn : item.locationEn}
                  </p>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                  {language === 'bn' ? 'আরোগ্যপ্রাপ্ত' : 'Verified'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Latest Health Articles / Blog */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#1769D2] uppercase tracking-wider bg-blue-100/60 px-3 py-1 rounded-md">
                {language === 'bn' ? 'স্বাস্থ্য সচেতনতা' : 'Health Advice'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {t.secBlogTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                {t.secBlogSub}
              </p>
            </div>

            <button
              onClick={() => navigateTo('blog')}
              className="text-xs font-semibold text-[#1769D2] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>{language === 'bn' ? 'সকল স্বাস্থ্য নিবন্ধ পড়ুন' : 'Read All Articles'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPostsData.slice(0, 3).map(post => (
              <div
                key={post.id}
                onClick={() => navigateTo('blog-details', { id: post.id })}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 transition-all hover:-translate-y-1 cursor-pointer flex flex-col group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#1769D2] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {language === 'bn' ? post.categoryBn : post.categoryEn}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">
                      {post.date} • {language === 'bn' ? post.readTimeBn : post.readTimeEn}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#1769D2] transition-colors leading-snug">
                      {language === 'bn' ? post.titleBn : post.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                      {language === 'bn' ? post.excerptBn : post.excerptEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium text-[11px]">
                      {language === 'bn' ? post.authorBn : post.authorEn}
                    </span>
                    <span className="text-[#1769D2] font-semibold flex items-center gap-1">
                      {t.viewDetails} →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#142B45] via-[#1769D2] to-[#0E9F92] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.secCtaTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {t.secCtaSub}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>{hospitalInfo.workingHoursEn}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => openAppointmentModal()}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#1769D2] hover:bg-slate-100 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              {t.bookAppointment}
            </button>
            <a
              href={`tel:${hospitalInfo.emergencyPhoneEn}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{language === 'bn' ? 'জরুরি কল: ০১৮১৯-৯৮৭৬৫৪' : 'Call: 01819-987654'}</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};

function CheckCircleIcon() {
  return (
    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}
