import React, { useState, useMemo } from 'react';
import { useHospital } from '../context/HospitalContext';
import { doctorsData, departmentsData } from '../data/hospitalData';
import { filterDoctors, formatBdCurrency } from '../utils/hospitalLogic';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Stethoscope, 
  Clock, 
  Award, 
  ArrowUpDown, 
  RotateCcw,
  UserCheck
} from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const { language, t, navigateTo, openAppointmentModal } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'experience' | 'fee-low' | 'fee-high' | 'name'>('experience');

  const filteredDoctors = useMemo(() => {
    return filterDoctors(doctorsData, {
      query: searchQuery,
      departmentId: selectedDept,
      availableTodayOnly,
      sortBy
    });
  }, [searchQuery, selectedDept, availableTodayOnly, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setAvailableTodayOnly(false);
    setSortBy('experience');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navDoctors }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'বিশেষজ্ঞ ডাক্তারদের তালিকা' : 'Specialist Doctors Directory'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'bn' ? 'আমাদের অভিজ্ঞ কনসালট্যান্টবৃন্দ' : 'Our Eminent Medical Consultants'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'ঢাকা ও কুমিল্লার খ্যাতনামা মেডিকেল কলেজ ও বিশেষায়িত হাসপাতালের অভিজ্ঞ অধ্যাপক এবং কনসালট্যান্টগণ নিয়মিত রোগী দেখছেন।'
              : 'Consult with leading professors, associate professors, and specialized clinicians across 16 medical faculties in Debidwar.'}
          </p>
        </div>

        <button
          onClick={() => openAppointmentModal()}
          className="px-6 py-3.5 bg-white text-[#1769D2] hover:bg-blue-50 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer shrink-0"
        >
          {t.bookAppointment}
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'ডাক্তারের নাম বা ডিগ্রি দিয়ে খুঁজুন...' : 'Search doctor by name, degree, or specialty...'}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2] focus:bg-white"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2] focus:bg-white"
            >
              <option value="all">{t.allDepartments} ({doctorsData.length})</option>
              {departmentsData.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {language === 'bn' ? dept.nameBn : dept.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1769D2] focus:bg-white"
            >
              <option value="experience">{language === 'bn' ? 'অভিজ্ঞতা অনুযায়ী (বেশি)' : 'Sort: Most Experienced'}</option>
              <option value="fee-low">{language === 'bn' ? 'ফি: কম থেকে বেশি' : 'Sort: Fee (Low to High)'}</option>
              <option value="fee-high">{language === 'bn' ? 'ফি: বেশি থেকে কম' : 'Sort: Fee (High to Low)'}</option>
              <option value="name">{language === 'bn' ? 'নামের বর্ণানুক্রমিক' : 'Sort: Name (A-Z)'}</option>
            </select>
          </div>

        </div>

        {/* Quick Toggles Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={availableTodayOnly}
                onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#1769D2] focus:ring-[#1769D2] border-slate-300"
              />
              <span className="font-semibold text-slate-700">
                {language === 'bn' ? 'শুধুমাত্র আজ উপস্থিত ডাক্তারগণ' : 'Available Today Only'}
              </span>
            </label>

            <span className="text-slate-400">|</span>

            <span className="text-slate-500">
              {language === 'bn' 
                ? `মোট ডাক্তার পাওয়া গেছে: ${filteredDoctors.length} জন` 
                : `Showing ${filteredDoctors.length} of ${doctorsData.length} Specialists`}
            </span>
          </div>

          {(searchQuery || selectedDept !== 'all' || availableTodayOnly) && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 p-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.clearFilters}</span>
            </button>
          )}
        </div>

      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200 transition-all hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Photo Card */}
                <div 
                  className="relative h-64 overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.nameEn}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                  
                  <div className="absolute top-3 left-3 bg-[#1769D2]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {language === 'bn' ? doctor.departmentBn : doctor.departmentEn}
                  </div>

                  {doctor.isAvailableToday && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{language === 'bn' ? 'আজ উপস্থিত' : 'Available Today'}</span>
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono">
                    {doctor.roomNo}
                  </div>
                </div>

                {/* Doctor Details info */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 
                      onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                      className="font-bold text-slate-900 text-base hover:text-[#1769D2] transition-colors cursor-pointer"
                    >
                      {language === 'bn' ? doctor.nameBn : doctor.nameEn}
                    </h3>
                    <p className="text-xs font-semibold text-[#1769D2] mt-0.5">
                      {language === 'bn' ? doctor.degreesBn : doctor.degreesEn}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                      {language === 'bn' ? doctor.titleBn : doctor.titleEn}
                    </p>
                  </div>

                  {/* Schedule & Fee Badges */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] space-y-1.5 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">{t.visitingSchedule}:</span>
                      <span className="font-semibold text-slate-700">
                        {language === 'bn' ? doctor.visitingDaysBn : doctor.visitingDaysEn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">{language === 'bn' ? 'সময়:' : 'Timing:'}</span>
                      <span className="font-semibold text-slate-700">
                        {language === 'bn' ? doctor.visitingTimeBn : doctor.visitingTimeEn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200/60 pt-1">
                      <span className="text-slate-400">{t.consultationFee}:</span>
                      <span className="font-bold text-[#1769D2]">
                        {formatBdCurrency(doctor.feeNewPatient, language)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => openAppointmentModal(doctor.id, doctor.departmentId)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#1769D2] to-[#0E9F92] hover:brightness-105 text-white text-xs font-semibold rounded-xl text-center shadow-2xs transition-all active:scale-98 cursor-pointer"
                >
                  {t.bookAppointment}
                </button>
                <button
                  onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                  className="px-3.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  {t.viewDetails}
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-blue-50 text-[#1769D2] rounded-full flex items-center justify-center mx-auto">
            <UserCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {language === 'bn' ? 'কোনো ডাক্তার পাওয়া যায়নি' : 'No Doctors Matched Your Filter'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'bn' 
              ? 'অনুগ্রহ করে ভিন্ন কোনো বিভাগ বা নাম দিয়ে পুনরায় অনুসন্ধান করুন।' 
              : 'Try searching with a different specialty keyword or clear your active filters.'}
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-[#1769D2] text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t.clearFilters}
          </button>
        </div>
      )}

    </div>
  );
};
