import React from 'react';
import { useHospital } from '../context/HospitalContext';
import { departmentsData, doctorsData } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Stethoscope, 
  Activity, 
  ArrowLeft, 
  ShieldCheck 
} from 'lucide-react';

export const DepartmentDetailsPage: React.FC = () => {
  const { 
    language, 
    t, 
    selectedDeptId, 
    navigateTo, 
    openAppointmentModal 
  } = useHospital();

  const dept = departmentsData.find(d => d.id === selectedDeptId) || departmentsData[0];
  const deptDoctors = doctorsData.filter(doc => doc.departmentId === dept.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: t.navDepartments, page: 'departments' },
          { label: language === 'bn' ? dept.nameBn : dept.nameEn }
        ]} 
      />

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[320px] flex items-end">
        <img
          src={dept.image}
          alt={dept.nameEn}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 p-6 sm:p-12 text-white max-w-3xl space-y-3">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'চিকিৎসা বিভাগ' : 'Clinical Department'}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {language === 'bn' ? dept.nameBn : dept.nameEn}
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            {language === 'bn' ? dept.taglineBn : dept.taglineEn}
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-200 pt-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{language === 'bn' ? dept.roomBn : dept.roomEn}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Description, Services, Facilities */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Department Overview */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'বিভাগীয় সংক্ষিপ্ত পরিচিতি' : 'Department Overview'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'bn' ? dept.descriptionBn : dept.descriptionEn}
            </p>
          </div>

          {/* Clinical Services Provided */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {t.servicesProvided}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {(language === 'bn' ? dept.servicesBn : dept.servicesEn).map((srv, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-[#1769D2] shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{srv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology & Facilities */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              {t.departmentFacilities}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {(language === 'bn' ? dept.facilitiesBn : dept.facilitiesEn).map((fac, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-50/50 border border-teal-100">
                  <ShieldCheck className="w-4 h-4 text-[#0E9F92] shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Doctors in this Department */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {t.doctorsInDept} ({deptDoctors.length})
              </h2>
            </div>

            {deptDoctors.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {deptDoctors.map(doctor => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={doctor.image}
                        alt={doctor.nameEn}
                        className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                        onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                      />
                      <div>
                        <h4 
                          onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                          className="font-bold text-slate-900 text-sm hover:text-[#1769D2] transition-colors cursor-pointer"
                        >
                          {language === 'bn' ? doctor.nameBn : doctor.nameEn}
                        </h4>
                        <p className="text-xs text-[#1769D2] font-semibold">{doctor.degreesEn}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{doctor.roomNo}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-600 space-y-1">
                      <p><span className="text-slate-400">বার:</span> {language === 'bn' ? doctor.visitingDaysBn : doctor.visitingDaysEn}</p>
                      <p><span className="text-slate-400">সময়:</span> {language === 'bn' ? doctor.visitingTimeBn : doctor.visitingTimeEn}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openAppointmentModal(doctor.id, dept.id)}
                        className="flex-1 py-2 bg-[#1769D2] hover:bg-blue-600 text-white text-xs font-semibold rounded-lg text-center transition-colors"
                      >
                        {t.bookAppointment}
                      </button>
                      <button
                        onClick={() => navigateTo('doctor-details', { id: doctor.id })}
                        className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg transition-colors"
                      >
                        {t.viewDetails}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-6 text-center text-xs text-slate-500">
                {language === 'bn' ? 'এই বিভাগের জন্য ভিজিটিং কনসালট্যান্ট শিডিউল অনুসন্ধানে জানতে হটলাইনে কল করুন।' : 'Call hotline for current visiting consultant schedule in this department.'}
              </div>
            )}
          </div>

        </div>

        {/* Right Sidebar: Quick Appointment & Other Departments */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Appointment Box */}
          <div className="bg-gradient-to-br from-[#142B45] to-[#1769D2] text-white p-6 rounded-2xl shadow-lg space-y-4">
            <h3 className="font-bold text-lg">
              {language === 'bn' ? 'এই বিভাগের অ্যাপয়েন্টমেন্ট নিন' : 'Book Department Appointment'}
            </h3>
            <p className="text-xs text-blue-100">
              {language === 'bn' ? 'অনলাইনে দ্রুত সিরিয়াল নিশ্চিত করুন অথবা সরাসরি হেল্পলাইনে ফোন করুন।' : 'Confirm your doctor consultation serial online in 1 minute.'}
            </p>
            <button
              onClick={() => openAppointmentModal(undefined, dept.id)}
              className="w-full py-3 bg-white text-[#1769D2] font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer shadow-md"
            >
              {t.bookAppointment}
            </button>
          </div>

          {/* Other Departments List */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              {language === 'bn' ? 'অন্যান্য বিভাগসমূহ' : 'Other Specialty Departments'}
            </h4>
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {departmentsData.filter(d => d.id !== dept.id).map(other => (
                <button
                  key={other.id}
                  onClick={() => navigateTo('department-details', { id: other.id })}
                  className="w-full text-left p-2.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-[#1769D2] transition-colors flex items-center justify-between"
                >
                  <span>{language === 'bn' ? other.nameBn : other.nameEn}</span>
                  <span className="text-slate-400 text-[10px]">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigateTo('departments')}
            className="w-full py-2.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'সকল ১৬টি বিভাগে ফিরে যান' : 'Back to All Departments'}</span>
          </button>

        </div>

      </div>

    </div>
  );
};
