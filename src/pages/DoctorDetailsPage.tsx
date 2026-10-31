import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { doctorsData, departmentsData } from '../data/hospitalData';
import { formatBdCurrency } from '../utils/hospitalLogic';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Stethoscope, 
  CheckCircle, 
  Phone, 
  ArrowLeft 
} from 'lucide-react';

export const DoctorDetailsPage: React.FC = () => {
  const { 
    language, 
    t, 
    selectedDoctorId, 
    navigateTo, 
    openAppointmentModal 
  } = useHospital();

  // Find target doctor or fallback to first
  const doctor = doctorsData.find(d => d.id === selectedDoctorId) || doctorsData[0];
  const relatedDoctors = doctorsData.filter(d => d.departmentId === doctor.departmentId && d.id !== doctor.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: t.navDoctors, page: 'doctors' },
          { label: language === 'bn' ? doctor.nameBn : doctor.nameEn }
        ]} 
      />

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Doctor Image and Quick Badges */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={doctor.image}
                alt={doctor.nameEn}
                className="w-full h-80 sm:h-96 object-cover object-top"
              />
              {doctor.isAvailableToday && (
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>{language === 'bn' ? 'আজ চেম্বারে উপস্থিত' : 'Available Today'}</span>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t.roomNumber}:</span>
                <span className="font-bold text-slate-800">{doctor.roomNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t.bmdcRegistration}:</span>
                <span className="font-mono font-bold text-slate-700">{doctor.bmdcRegNo}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t.experienceLabel}:</span>
                <span className="font-bold text-emerald-600">
                  {doctor.experienceYears}+ {language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}
                </span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 space-y-6">
            
            <div>
              <span className="text-xs font-bold text-[#1769D2] bg-blue-50 px-3 py-1 rounded-md">
                {language === 'bn' ? doctor.departmentBn : doctor.departmentEn}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {language === 'bn' ? doctor.nameBn : doctor.nameEn}
              </h1>
              <p className="text-sm font-semibold text-[#1769D2] mt-1">
                {language === 'bn' ? doctor.degreesBn : doctor.degreesEn}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {language === 'bn' ? doctor.titleBn : doctor.titleEn}
              </p>
            </div>

            {/* Chamber Visiting Hours & Fees Card */}
            <div className="bg-gradient-to-r from-blue-50/70 to-teal-50/50 rounded-2xl p-6 border border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#1769D2]">
                  <Clock className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">{t.visitingSchedule}</h4>
                </div>
                <p className="text-sm font-bold text-slate-800">
                  {language === 'bn' ? doctor.visitingDaysBn : doctor.visitingDaysEn}
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  {language === 'bn' ? doctor.visitingTimeBn : doctor.visitingTimeEn}
                </p>
              </div>

              <div className="space-y-2 sm:border-l sm:border-blue-200/80 sm:pl-6">
                <div className="flex items-center gap-2 text-[#0E9F92]">
                  <Award className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">{t.consultationFee}</h4>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-slate-900">
                    {formatBdCurrency(doctor.feeNewPatient, language)}
                  </span>
                  <span className="text-[11px] text-slate-500">({t.newPatientFee})</span>
                </div>
                <p className="text-xs text-slate-500">
                  {t.followUpFee}: <span className="font-semibold text-slate-800">{formatBdCurrency(doctor.feeFollowUp, language)}</span>
                </p>
              </div>

            </div>

            {/* Book Appointment CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => openAppointmentModal(doctor.id, doctor.departmentId)}
                className="px-6 py-3.5 bg-gradient-to-r from-[#1769D2] to-[#0E9F92] hover:brightness-105 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookWithDoctor}</span>
              </button>
              
              <button
                onClick={() => navigateTo('doctors')}
                className="px-5 py-3.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'bn' ? 'সকল ডাক্তারের তালিকা' : 'Back to Doctors List'}</span>
              </button>
            </div>

            {/* Biography */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {language === 'bn' ? 'চিকিৎসক পরিচিতি' : 'Professional Biography'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'bn' ? doctor.aboutBn : doctor.aboutEn}
              </p>
            </div>

            {/* Specializations & Clinical Areas */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {t.specialties}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(language === 'bn' ? doctor.specializationsBn : doctor.specializationsEn).map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-slate-700 text-xs font-medium border border-blue-100"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#1769D2]" />
                    <span>{spec}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Education and Credentials */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {t.education}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                {(language === 'bn' ? doctor.educationBn : doctor.educationEn).map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Related Department Specialists */}
      {relatedDoctors.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">
            {language === 'bn' 
              ? `${doctor.departmentBn} বিভাগের অন্যান্য চিকিৎসকগণ` 
              : `Other Specialists in ${doctor.departmentEn}`}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedDoctors.map(doc => (
              <div
                key={doc.id}
                onClick={() => navigateTo('doctor-details', { id: doc.id })}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
              >
                <img
                  src={doc.image}
                  alt={doc.nameEn}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-[#1769D2] transition-colors">
                    {language === 'bn' ? doc.nameBn : doc.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{doc.degreesEn}</p>
                  <span className="text-[11px] text-[#1769D2] font-semibold mt-1 inline-block">
                    {language === 'bn' ? 'প্রোফাইল দেখুন →' : 'View Profile →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
