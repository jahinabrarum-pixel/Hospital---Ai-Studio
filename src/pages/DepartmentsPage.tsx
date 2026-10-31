import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { departmentsData } from '../data/hospitalData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search, ChevronRight, Stethoscope, ArrowRight } from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const { language, t, navigateTo } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepts = departmentsData.filter(dept => 
    dept.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.nameBn.includes(searchTerm) ||
    dept.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.servicesEn.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: t.navDepartments }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#142B45] to-[#1769D2] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-md">
            {language === 'bn' ? 'চিকিৎসা অনুষদ ও বিভাগ' : 'Clinical Centers of Excellence'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'bn' ? 'আমাদের বিশেষায়িত ১৬টি চিকিৎসা বিভাগ' : 'Our 16 Specialized Clinical Departments'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {language === 'bn'
              ? 'হৃদরোগ, নিউরো, অর্থোপেডিকস, গাইনী, শিশু, সার্জারি এবং জরুরি চিকিৎসা সহ সকল ক্ষেত্রে উন্নত প্রযুক্তি ও অভিজ্ঞ চিকিৎসকদের সমন্বয়।'
              : 'Delivering multidisciplinary patient care from routine outpatient consultations to complex laparoscopic surgery and critical care.'}
          </p>
        </div>

        {/* Search input in banner */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'bn' ? 'বিভাগ খুঁজুন...' : 'Search departments...'}
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-white text-slate-800 rounded-xl focus:outline-none shadow-md"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDepts.map(dept => (
          <div
            key={dept.id}
            onClick={() => navigateTo('department-details', { id: dept.id })}
            className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={dept.image}
                  alt={dept.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 bg-[#1769D2]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  {dept.roomEn}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-[#1769D2] transition-colors">
                  {language === 'bn' ? dept.nameBn : dept.nameEn}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {language === 'bn' ? dept.taglineBn : dept.taglineEn}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {(language === 'bn' ? dept.servicesBn : dept.servicesEn).slice(0, 2).map((srv, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs pt-3">
              <span className="font-semibold text-[#1769D2]">
                {language === 'bn' ? 'বিভাগীয় তথ্য ও ডাক্তার' : 'View Details & Doctors'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1769D2] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
